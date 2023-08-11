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
      id: req.user.id
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










module.exports = router;
