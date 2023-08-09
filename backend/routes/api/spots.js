const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User, Spot, Review, SpotImage } = require("../../db/models");
const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

router.get("/", async (req, res) => {
  // let reviews = await Review.findAll();
  const allSpots = await Spot.findAll({
    include: {
      model: Review,
      attributes: ["stars"],
    },
  });
  // let reviewCount = Review.count();
  let allSpotsList = [];
  allSpots.forEach((spot) => {
    allSpotsList.push(spot.toJSON());
  });
  allSpotsList.forEach((spots) => {
    let starSum = 0;
    spots.Reviews.forEach((reviews) => {
      starSum += reviews.stars;
    });
    spots.avgRating =
      starSum / (spots.Reviews.length ? spots.Reviews.length : 1);
    spots.previewImage = "url.url.com";
    delete spots.Reviews;
  });
  return res.json(allSpotsList);
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

router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;
  console.log('hello')
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
    return res.json(currentUserSpotsList);
  }
});

// router.get('/current', requireAuth, async (req, res) => {
//   const userId = req.user.id
//   if (userId) {
//     const spot = await Spot.findAll({
//       include: {
//         model: Review,
//         attributes: ["stars"],
//       },
//       where: {
//         ownerId: userId,
//       },
//     })
//     console.log('curr**', spot)
//   }
// })


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

  const spotObj = spot.toJSON();
  spotObj.spotImages = spotImages;
  spotObj.owner = user;
  return res.json(spotObj);
});

router.delete("/:spotId", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (spot) {
    await spot.destroy();
    return res.json({
      message: "Successfully deleted",
    });
  } else if (!spot) {
    res.status(404)
    return res.json({
      message: "Spot couldn't be found",
    });
  }
});

router.put("/:spotId", requireAuth, async (req, res, next) => {
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
    // if (!req.params.spotId) {
    //   res.status(404)
    //   return res.json(
    //     {
    //     message: "Spot couldn't be found"
    //     }
    //   )
    // }
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
  const user = req.user.id;
  const spotId = req.params.spotId;
  if (user) {
    const { url, preview } = req.body;
    const newSpotImage = await SpotImage.create({
      spotId,
      url,
      preview,
    });
    return res.json(newSpotImage);
  } else if (!spotId) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
});

module.exports = router;
