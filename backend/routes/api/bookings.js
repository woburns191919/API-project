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

router.get("/current", requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id,
    },
    include: {
      model: Spot,
      attributes: {
        exclude: ["createdAt", "updatedAt", "description", "SpotImages"],
      },
      include: {
        model: SpotImage,
        attributes: ["url", "preview"],
      },
    },
  });

  const bookingsArr = [];
  bookings.forEach((bookingsObj) => {
    bookingsArr.push(bookingsObj.toJSON());
  });
  bookingsArr.forEach((bookingsObj) => {

    const previewImage = bookingsObj.Spot.SpotImages.find(img => img.preview)?.url;
    bookingsObj.Spot.previewImage = previewImage || bookingsObj.Spot.SpotImages[0]?.url;
    delete bookingsObj.Spot.SpotImages;
  });

  return res.json({ Bookings: bookingsArr });
});

router.put("/:bookingId", requireAuth, async (req, res) => {
  const currentBooking = await Booking.findByPk(req.params.bookingId);

  if (!currentBooking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
    });
  }

  if (req.user.id !== currentBooking.userId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
    });
  }

  const { startDate, endDate } = req.body;
  const today = new Date().toJSON().slice(0, 10);

  if (today > startDate || today > endDate) {
    res.status(403);
    return res.json({
      message: "Past bookings can't be modified",
    });
  }
  if (endDate < startDate) {
    res.status(400);
    return res.json({
      message: "Bad Request",
      errors: {
        endDate: "End date cannot come before start date",
      },
    });
  }

  const bookingslist = await Booking.findAll({
    where: {
      spotId: currentBooking.spotId,
      id: {
        [Op.ne]: currentBooking.id,
      },
    },
  });

  //------comparison list, booking array
  let bookingsListArr = [];
  bookingslist.forEach((existingBookingObj) => {
    bookingsListArr.push(existingBookingObj.toJSON());
  });
  let errors = {};
  bookingsListArr.forEach((existingBookingObj) => {
    if (
      startDate >= existingBookingObj.startDate &&
      startDate <= existingBookingObj.endDate
    ) {
      errors.status = 403;
      errors.message = "Sorry, this spot is already booked for the specified dates"
      errors.startDate = "Start date conflicts with an existing booking";
    } //3                  //5          //3                    //1
    if (
      endDate <= existingBookingObj.endDate &&
      endDate >= existingBookingObj.startDate
    ) {
      errors.status = 403;
      // errors.message = "Sorry, this spot is already booked for the specified dates"
      errors.endDate = "End date conflicts with an existing booking";
    }
  });
  // ----end compare array

  if (Object.keys(errors).length > 0) {
    res.status(errors.status);
    delete errors.status;
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: errors,
    });
  }
  await currentBooking.update({
    startDate,
    endDate,
  });
  await currentBooking.save();
  res.status(200);
  return res.json(currentBooking);
});

router.delete("/:bookingId", requireAuth, async (req, res) => {
  const currentBooking = await Booking.findByPk(req.params.bookingId);

  if (!currentBooking) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
    });
  }

  if (req.user.id !== currentBooking.userId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
    });
  }

  const today = new Date().toJSON().slice(0, 10);

  const currentBookingObj = currentBooking.toJSON();
  if (
    today >= currentBookingObj.startDate &&
    today <= currentBookingObj.endDate
  ) {
    res.status(403);
    return res.json({
      message: "Bookings that have been started can't be deleted",
    });
  }

  await currentBooking.destroy();
  return res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
