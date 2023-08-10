const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User, Spot, Review, SpotImage, Booking, ReviewImage } = require("../../db/models");
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

router.get('/current', requireAuth, async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  })
  const spot = await Spot.findOne({
    where: {
      id: req.user.id
    }
  })

  const reviewImages = await ReviewImage.findAll({
    where: {
      reviewId: spot.id
    }
  })
  console.log(reviewImages)


  const reviews = await Review.findAll({
    where: {
      id: spot.id
    }
  })

  let userObj = {
   id: user.id,
   firstName: user.firstName,
   lastName: user.lastName
  }

  let spotObj = {
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    price: spot.price,
    previewImage: 'url'
  }




  let reviewsArr = []
  reviews.forEach(reviews => {
    reviewsArr.push(reviews.toJSON())
  })
  reviewsArr.forEach(review => {
    review.User = userObj,
    review.Spot = spotObj
  })

// console.log(reviewsArr)


})







  // let reviewList = []
  // reviews.forEach(reviews => {
  //   reviewList.push(reviews.toJSON())
  // })
  // let idCheck = ''
  // reviewList.forEach(review => {
  //   idCheck += review.userId
  //   })
  //   console.log(idCheck.split(' '))
  // })

  // console.log(reviews)

  //  const currentUserReviews = await Review.findAll({
  //   where: {
  //     userId: req.user.id
  //   }
  //  })
  //  console.log(currentUserReviews)





module.exports = router;
