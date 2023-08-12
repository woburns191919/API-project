const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User, Spot, Review, SpotImage, Booking } = require("../../db/models");
const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");


// router.get('/:bookingId', requireAuth, async (req, res) => {
//   // const booking = await Booking.findByPk(req.params.bookingId)
//   // console.log(booking)
//   console.log('hello')
// })


router.get('/current', requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'description', 'SpotImages']
      },
      include: {
        model: SpotImage,
        attributes: {
          exclude: ['id', 'spotId', 'preview', 'createdAt', 'updatedAt']
        }
      }
    }
    })

    const bookingsArr = []
    bookings.forEach(bookingsObj => {
      bookingsArr.push(bookingsObj.toJSON())
    })
    bookingsArr.forEach(bookingsObj => {
      bookingsObj.Spot.previewImage = bookingsObj.Spot.SpotImages[0].url
      delete bookingsObj.Spot.SpotImages
    })
    return res.json({'Bookings': bookingsArr})
  })

router.put('/:bookingId', requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId)
  if (!booking) {
    res.status(404)
    return res.json(
      {
        message: "Booking couldn't be found"
      }
    )
  }
  const endDate = booking.endDate
  const startDate = booking.startDate

  if (endDate < startDate) {
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
})









module.exports = router;
