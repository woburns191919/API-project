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

const { check, query } = require("express-validator");
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
    .isFloat({ min: -180, max: 180 })
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
const validatePost = [
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
    .isFloat({ min: -180, max: 180 })
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

const validatequery = [
  query("page")
    .exists({ checkFalsy: true })
    .isFloat({ min: 1 })
    .optional()
    .withMessage("Page must be greater than or equal to 1"),
  query("size")
    .exists({ checkFalsy: true })
    .isFloat({ min: 1 })
    .optional()
    .withMessage("Size must be greater than or equal to 1"),
  handleValidationErrors,
];

router.get("/", validatequery, async (req, res) => {
  const pagination = {};

  let { page, size } = req.query;

  page = parseInt(page);
  size = parseInt(size);

  if (size > 20 || size < 1 || !size) size = 20;
  if (page > 10 || page < 1 || !page) page = 1;

  pagination.limit = size;
  pagination.offset = (page - 1) * size;

  const allSpots = await Spot.findAll({
    include: [
      {
        model: Review,
        attributes: ["stars"],
      },
      {
        model: SpotImage,
        attributes: ["url", "preview"],
      },
    ],
    ...pagination,
  });

  let allSpotsList = [];
  allSpots.forEach((spot) => {
    allSpotsList.push(spot.toJSON());
  });
  allSpotsList.forEach((spots) => {
    spots.SpotImages.forEach((image) => {
      if (image.preview) spots.previewImage = image.url;
    });

    let starSum = 0;
    spots.Reviews.forEach((reviews) => {
      starSum += reviews.stars;
    });
    spots.avgRating =
      starSum / (spots.Reviews.length ? spots.Reviews.length : 1);
    // spots.previewImage = "url.url.com";
    delete spots.Reviews;
    delete spots.SpotImages;
  });
  return res.json({
    Spots: allSpotsList,
    page,
    size,
  });
});

router.post("/", requireAuth, validatePost, async (req, res) => {
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
      include: [
        {
          model: Review,
          attributes: ["stars"],
        },
        {
          model: SpotImage,
          attributes: ["url"],
        },
      ],
      where: {
        ownerId: userId,
      },
    });
    let currentUserSpotsList = [];
    currentUserSpots.forEach((spot) => {
      currentUserSpotsList.push(spot.toJSON());
    });
    currentUserSpotsList.forEach((spots) => {
      spots.SpotImages.forEach((image) => {
        spots.previewImage = image.url;
      });

      let starSum = 0;
      spots.Reviews.forEach((reviews) => {
        starSum += reviews.stars;
      });
      spots.numReviews = spots.Reviews.length;
      spots.avgRating =
        starSum / (spots.Reviews.length ? spots.Reviews.length : 1);
      delete spots.Reviews;
      delete spots.SpotImages;
    });
    return res.json({ Spots: currentUserSpotsList });
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
  const userObj = user.toJSON();
  delete userObj.username;
  const spotImages = await spot.getSpotImages();
  let spotImagesArr = [];
  spotImages.forEach((image) => {
    spotImagesArr.push(image.toJSON());
  });
  spotImagesArr.forEach((el) => {
    delete el.createdAt;
    delete el.updatedAt;
    delete el.spotId;
  });
  const spotReviews = await spot.getReviews();
  let numReviews = spotReviews.length;
  let starSum = 0;
  spotReviews.forEach((el) => {
    starSum += el.stars;
  });
  let avgStarRating = starSum / numReviews;

  // delete userObj.username

  const spotObj = spot.toJSON();
  spotObj.numReviews = numReviews;
  spotObj.avgStarRating = avgStarRating;
  spotObj.SpotImages = spotImagesArr;
  spotObj.Owner = userObj;

  // delete spotObj.SpotImages.createdAt
  // delete spotObj.SpotImages.updatedAt
  // delete spotObj.Owner.userName
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
  } else if (officialOwner.ownerId !== req.user.id) {
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
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
  if (req.user.id !== spot.ownerId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
    });
  }

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

  if (spot.ownerId === req.user.id) {
    const { url, preview } = req.body;
    const newSpotImage = await SpotImage.create({
      spotId,
      url,
      preview,
    });
    const newSpotImageObj = newSpotImage.toJSON();
    delete newSpotImageObj.updatedAt;
    delete newSpotImageObj.createdAt;
    delete newSpotImageObj.spotId;

    return res.json(newSpotImageObj);
  } else if (spot.ownerId !== req.user.id) {
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

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

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
    let bookings = await Booking.findAll({
      where: {
        spotId: spot.id,
      },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    });

    return res.json({ Bookings: bookings });
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

    return res.json({ Bookings: bookedSpotArr });
  }
});

router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  try {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (req.user.id === spot.ownerId) {
      return res
        .status(403)
        .json({ message: "You cannot book your own place" });
    }

    const existingBookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
    });
    const { startDate, endDate } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let bookingConflict = existingBookings.some((booking) => {
      const existingStart = new Date(booking.startDate);
      const existingEnd = new Date(booking.endDate);
      return (
        (new Date(startDate) >= existingStart &&
          new Date(startDate) <= existingEnd) ||
        (new Date(endDate) >= existingStart &&
          new Date(endDate) <= existingEnd) ||
        (new Date(startDate) <= existingStart &&
          new Date(endDate) >= existingEnd)
      );
    });

    if (new Date(endDate) <= new Date(startDate)) {
      return res
        .status(400)
        .json({ message: "End date cannot be on or before start date" });
    } else if (new Date(startDate) < today || new Date(endDate) < today) {
      return res
        .status(400)
        .json({ message: "Booking dates cannot be in the past" });
    } else if (bookingConflict) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
      });
    } else {
      const newBooking = await Booking.create({
        spotId: parseInt(req.params.spotId),
        userId: req.user.id,
        startDate,
        endDate,
      });
      return res.status(201).json(newBooking);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
