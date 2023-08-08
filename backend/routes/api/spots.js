const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth  } = require('../../utils/auth');
const { User, Spot, Review, SpotImage} = require('../../db/models');
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
    let reviews = await Review.findAll()
    const allSpots = await Spot.findAll()
    let reviewCount = await Review.count()


    let allSpotsList = []
    allSpots.forEach(spot => {
      let starSum = 0
      reviews.forEach(review => {
        starSum += review.stars
      })
      console.log(starSum)

      allSpotsList.push(spot.toJSON())
    })

    allSpotsList.forEach(spots => {



      let avgRating = starSum/reviewCount
      spots.avgRating = avgRating
      spots.previewImage = 'url.url.com'
      delete spots.Reviews
    })
    return res.json(allSpotsList)
  }
);


router.post('/', requireAuth, async (req, res) => {
  const ownerId = req.user.id
  if (ownerId) {
  const { address, city, state, country, lat, lng, name, description, price } = req.body

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
    price

  })
  return res.json(newSpot)
}
})




 router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    if (userId) {
    const reviews = await Review.findAll()
    const currentUserSpots = await Spot.findAll({
      where: {
        ownerId: userId
      }
    })
    let reviewCount = await Review.count()
    let currentUserSpotsList = []
    currentUserSpots.forEach(spot => {
      currentUserSpotsList.push(spot.toJSON())
    })
      let starSum = 0
      currentUserSpotsList.forEach(spots => {
        reviews.forEach(review => {
        starSum += review.stars
        })
        spots.avgRating = starSum/reviewCount
        spots.previewImage = 'url.url.com'
        delete spots.Reviews
    })

    return res.json(currentUserSpotsList)
  }
 })


 router.get('/:spotId', async (req, res) => {

  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    res.status(404)
    res.json({
      message: "Spot couldn't be found"
    })
  }

  const user = await spot.getUser()
  const spotImages = await spot.getSpotImages()

  const spotObj = spot.toJSON()
  spotObj.spotImages = spotImages
  spotObj.owner = user
  return res.json(spotObj)

 })


module.exports = router;
