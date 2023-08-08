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
    let reviewCount = Review.count()
    let allSpotsList = []
    allSpots.forEach(spot => {
      allSpotsList.push(spot.toJSON())
    })
    allSpotsList.forEach(spots => {
      // console.log('spots***', spots)
      let starSum = 0
      reviews.forEach(reviews => {
        // console.log('stars***', reviews.stars)
        starSum += reviews.stars
      })
      spots.avgRating = starSum/reviewCount
      spots.previewImage = 'url.url.com'
      delete spots.Reviews
    })
    return res.json(allSpotsList)
  })


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









 router.delete('/:spotId', requireAuth, async (req, res) => {
   const spot = await Spot.findByPk(req.params.spotId)
   console.log(spot)
   if (spot) {
    await spot.destroy()
    return res.json({
      message: "Successfully deleted"
    })
   }
  })


















 router.put('/:spotId', requireAuth, async (req, res, next) => {
    const user = req.user.id
    if (user) {
      const { id, ownerId, address, city, state, country, lat, lng, name, description, price, createdAt, updatedAt } = req.body
      // if (!req.params.spotId) {
      //   res.status(404)
      //   return res.json(
      //     {
      //     message: "Spot couldn't be found"
      //     }
      //   )
      // }
      const spot = await Spot.findByPk(req.params.spotId)
      if (!spot) {
      res.status(404)
        return res.json(
          {
          message: "Spot couldn't be found"
          }
        )
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
        updatedAt
      })
      await spot.save()
      res.status(201)
      res.json(spot)
    }
 })

 router.post('/:spotId/images', requireAuth, async (req, res) => {
  const user = req.user.id
  const spotId = req.params.spotId
  if (user) {
    const { url, preview } = req.body
    const newSpotImage = await SpotImage.create({
      spotId,
      url,
      preview
    })
    return res.json(newSpotImage)
  } else if (!spotId) {
    res.status(404)
    return res.json(
      {
        message: "Spot couldn't be found"
      }
    )
  }

 })


module.exports = router;
