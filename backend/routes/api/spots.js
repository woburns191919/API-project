const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];





router.get('/', async (req, res) => {
    // let reviews = await Review.findAll()
    const allSpots = await Spot.findAll({
      include: {
        model: Review
      }
    })
    console.log(allSpots)
    let allSpotsList = []
    allSpots.forEach(spot => {
      allSpotsList.push(spot.toJSON())
      //previewImage
      //avgRating
    })

    allSpotsList.forEach(spot => {
      let starSum = 0
      spot.Reviews.forEach(review => {
        starSum += review.stars
      })
      console.log(starSum)
    })
  }
);

module.exports = router;
