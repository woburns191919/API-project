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


router.get('/current', requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({
    where: {
      id: req.user.id
    },
    include: {
      model: Spot,
      include: {
        model: SpotImage
      }
    }
    //   include: [
    //   {
    //     model: Spot
    //   },
    //   {
    //     model: SpotImage
    //   }
    // ]
      // attributes: ['startDate', 'endDate', 'createdAt', 'updatedAt']
    })
    // include: {
    //   model: User,
    //   attributes: ['id']
    // }
    const bookingsArr = []
    bookings.forEach(bookingsObj => {
      bookingsArr.push(bookingsObj.toJSON())
    })
    bookingsArr.forEach(bookingsObj => {
      bookingsObj.previewImage = bookingsObj.SpotImages
      console.log(bookingsObj)
    })
    // console.log(bookingsArr)
  })






module.exports = router;
