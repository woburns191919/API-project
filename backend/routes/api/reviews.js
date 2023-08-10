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
  Spot,
  Review,
  SpotImage,
  Booking,
  ReviewImage,
} = require("../../db/models");
const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

router.get("/current", requireAuth, async (req, res) => {
  let reviews = await Review.findAll({
    where: {
      id: req.user.id,
    },
    include: [
      {
        model: ReviewImage,
        attributes: [
          'id', 'url'
        ]

      },
      {
        model: Spot,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'description']
        },
          include: {
            model: SpotImage,
            where: {
              preview: true
            },
            limit: 1
          }
      },
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  });
  let reviewsArr = []
  reviews.forEach(reviews => {
    reviewsArr.push(reviews.toJSON())
  })
  reviewsArr.forEach(review => {
    review.Spot.previewImage = review.Spot.SpotImages[0].url
    delete review.Spot.SpotImages
  })
  // reviewsArr[0].Spot.previewImage = reviewsArr[0].Spot.SpotImages.url
  // console.log(reviewsArr[0].Spot.SpotImages[0].url)
  // console.log(reviews)
  res.json(reviewsArr)



  // console.log(reviews);

  // const user = await User.findOne({
  //   where: {
  //     id: req.user.id,
  //   },
  // });

  // const reviewImages = await ReviewImage.findAll({
  //   where: {
  //     id: Review.id
  //   },
  // });
  // console.log(reviewImages)

  // const spot = await Spot.findOne({
  //   where: {
  //     id: Review.spotId
  //   },
  // });

  // console.log(reviewImages);

  // let userObj = {
  //   id: user.id,
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  // };

  // let spotObj = {
  //   id: spot.id,
  //   ownerId: spot.ownerId,
  //   address: spot.address,
  //   city: spot.city,
  //   state: spot.state,
  //   country: spot.country,
  //   lat: spot.lat,
  //   lng: spot.lng,
  //   name: spot.name,
  //   price: spot.price,
  //   previewImage: "url",
  // };

  // let reviewsArr = [];
  // reviews.forEach((reviews) => {
  //   reviewsArr.push(reviews.toJSON());
  // });
  // reviewsArr.forEach((review) => {
  //   (review.User = userObj), (review.Spot = spotObj);
  // });

  // console.log(reviewsArr);
});

module.exports = router;
