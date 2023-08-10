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

router.get('/current', requireAuth, async (req, res) => {

  const reviews = await Review.findAll()
  let reviewsArr = [];
  let userId = ''
  reviews.forEach(reviews => {
    if (reviews.userId === req.user.id) {
      userId += reviews.userId
    }
  })
  console.log(userId)



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
