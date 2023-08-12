const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const {
  User,
  Booking,
  Spot,
  Review,
  SpotImage,
  ReviewImage,
} = require("../../db/models");
const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const e = require("express");

const validateEdit = [
  check("address")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];
const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isFloat({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];


router.get("/", async (req, res) => {


  // const where = {}

  // const { page, size, }

  const allSpots = await Spot.findAll({
    include: [
      {
      model: Review,
      attributes: ["stars"],
    },
    {
      model: SpotImage,
      attributes: ['url']
    }
  ],
  });




  let allSpotsList = [];
  allSpots.forEach((spot) => {
    allSpotsList.push(spot.toJSON());
  });
  allSpotsList.forEach((spots) => {
    spots.SpotImages.forEach(image => {
      spots.previewImage = image.url
    })


    let starSum = 0;
    spots.Reviews.forEach((reviews) => {
      starSum += reviews.stars;
    });
    spots.avgRating =
      starSum / (spots.Reviews.length ? spots.Reviews.length : 1);
    // spots.previewImage = "url.url.com";
    delete spots.Reviews;
    delete spots.SpotImages
  });
  return res.json({ Spots: allSpotsList });
});

router.post("/", requireAuth, async (req, res) => {
  const ownerId = req.user.id;

  if (ownerId) {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    const newSpot = await Spot.create({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    res.status(201);
    return res.json(newSpot);
  }
});

router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;

  if (userId) {
    const currentUserSpots = await Spot.findAll({
      include: {
        model: Review,
        attributes: ["stars"],
      },
      where: {
        ownerId: userId,
      },
    });
    let currentUserSpotsList = [];
    currentUserSpots.forEach((spot) => {
      currentUserSpotsList.push(spot.toJSON());
    });
    let starSum = 0;

    currentUserSpotsList.forEach((spots) => {
      spots.Reviews.forEach((reviews) => {
        starSum += reviews.stars;
      });
      spots.numReviews = spots.Reviews.length;
      spots.avgRating =
        starSum / (spots.Reviews.length ? spots.Reviews.length : 1);
      spots.previewImage = "url.url.com";
      delete spots.Reviews;
    });
    return res.json({ "Spots": currentUserSpotsList });
  }
});

router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
    });
  }

  const user = await spot.getUser();
  const spotImages = await spot.getSpotImages();
  const spotReviews = await spot.getReviews();
  let numReviews = spotReviews.length;
  let starSum = 0;
  spotReviews.forEach((el) => {
    starSum += el.stars;
  });
  let avgStarRating = starSum / numReviews;

  const spotObj = spot.toJSON();
  spotObj.numReviews = numReviews;
  spotObj.avgStarRating = avgStarRating;
  spotObj.SpotImages = spotImages;
  spotObj.Owner = user;
  return res.json(spotObj);
});

router.delete("/:spotId", requireAuth, async (req, res) => {
  const spot = req.params.spotId;
  const officialOwner = await Spot.findByPk(spot);
  const deletedSpot = await Spot.destroy({
    where: {
      id: spot,
      ownerId: req.user.id,
    },
  });

  if (!officialOwner) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  } else if (officialOwner && officialOwner.id !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  } else if (deletedSpot) {
    return res.status(200).json({
      message: "Successfully deleted",
    });
  }
});

router.put("/:spotId", requireAuth, validateEdit, async (req, res, next) => {
  const user = req.user.id;
  if (user) {
    const {
      id,
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      createdAt,
      updatedAt,
    } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
      });
    }
    await spot.update({
      id,
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      createdAt,
      updatedAt,
    });
    await spot.save();
    res.status(200);
    res.json(spot);
  }
});

router.post("/:spotId/images", requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
  if (parseInt(spot.id) === parseInt(req.user.id)) {
    const { url, preview } = req.body;
    const newSpotImage = await SpotImage.create({
      spotId,
      url,
      preview,
    });
    return res.json(newSpotImage);
  } else if (spot && spot.id !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
});

router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const { review, stars, createdAt, updatedAt } = req.body;
    if (!spot) {
      res.status(404);
      return res.json({
        message: "Spot couldn't be found",
      });
    }
    const existingReview = await Review.findAll({
      where: {
        userId: req.user.id,
        spotId: req.params.spotId,
      },
    });
    if (existingReview.length > 0) {
      res.status(500);
      return res.json({
        message: "User already has a review for this spot",
      });
    }
    if (existingReview.length === 0) {
      const newReview = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review,
        stars,
        createdAt,
        updatedAt,
      });
      res.status(201);
      return res.json(newReview);
    }
  }
);

router.get("/:spotId/reviews", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: {
      model: Review,
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
        },
      ],
    },
  });
  let spotObj = spot.toJSON();
  let spotArr = spotObj.Reviews;
  let newObj = {
    Reviews: spotArr,
  };

  return res.json(newObj);
});

router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  if (req.user.id === spot.ownerId) {
    console.log(req.user.id);
    let bookings = await Booking.findAll({
      where: {
        spotId: spot.id,
      },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    });

    let ownedSpotArr = [];
    bookings.forEach((ownedSpot) => {
      ownedSpotArr.push(ownedSpot.toJSON());
    });

    ownedSpotArr.forEach((ownedSpotObj) => {
      let newStartDate = ownedSpotObj.startDate.toISOString().split("T")[0];
      delete ownedSpotObj.startDate;
      ownedSpotObj.startDate = newStartDate;

      let endDate = ownedSpotObj.endDate.toISOString().split("T")[0];
      delete ownedSpotObj.endDate;
      ownedSpotObj.endDate = endDate;
    });
    return res.json({ "Bookings": ownedSpotArr });

  } else if (spot) {
    let bookings = await Booking.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: ["spotId", "startDate", "endDate"],
    });

    let bookedSpotArr = [];
    bookings.forEach((bookedSpot) => {
      bookedSpotArr.push(bookedSpot.toJSON());
    });

    bookedSpotArr.forEach((bookedSpotObj) => {

      let newStartDate = bookedSpotObj.startDate.toISOString().split("T")[0];
      delete bookedSpotObj.startDate;
      bookedSpotObj.startDate = newStartDate;

      let endDate = bookedSpotObj.endDate.toISOString().split("T")[0];
      delete bookedSpotObj.endDate;
      bookedSpotObj.endDate = endDate;
    });
    return res.json({ "Bookings": bookedSpotArr });
  }
});

router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
  if (req.user.id === spot.ownerId) {
    res.status(403)
    return res.json(
      {
       message: "Forbidden"
      }
    )
  }

  if (req.user.id !== spot.ownerId) {
    const {spotId, userId, startDate, endDate, createdAt, updatedAt } =
      req.body;
      const currentDate = new Date().toJSON().slice(0,10)
      console.log(startDate)
      if (endDate < currentDate) {
        res.status(400)
        return res.json(
          {
            message: "Bad Request",
            errors: {
              endDate: "endDate cannot come before startDate"
            }
          }
        )
      }
    // let formattedStart = startDate.toISOString().split("T")[0]
    // console.log(formattedStart)
    const newSpot = await Booking.create({
      spotId: parseInt(req.params.spotId),
      userId: req.user.id,
      startDate,
      endDate,
      createdAt,
      updatedAt,
    });
    let newSpotObj = newSpot.toJSON()
    return res.json(newSpotObj)
    // return res.json(newSpot);
  }
});





module.exports = router;
