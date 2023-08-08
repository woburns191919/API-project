const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth  } = require('../../utils/auth');
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
    let reviewCount = await Review.count()
    let allSpotsList = []
    allSpots.forEach(spot => {
      allSpotsList.push(spot.toJSON())
    })
    let starSum = 0
    allSpotsList.forEach(spots => {
      spots.Reviews.forEach(reviews => {
      starSum += reviews.stars
      })
      spots.avgRating = starSum/reviewCount
      spots.previewImage = 'url.url.com'
      delete spots.Reviews
    })
    return res.json(allSpotsList)
  }
);

 router.get('/current', requireAuth, async (req, res, next) => {
  const userId = req.user.id
    const currentUserSpots = await Spot.findAll({
      where: {
        ownerId: userId
      }
    })
    let currentUserSpotsList = []
    currentUserSpots.forEach(spots => {
      console.log(spots)
    })
    console.log(currentUserSpots)
 })

module.exports = router;
