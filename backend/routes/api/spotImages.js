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

router.delete('/:imageId', requireAuth, async (req, res) => {
  const currentSpotImage = await SpotImage.findByPk(req.params.imageId)

  if (!currentSpotImage) {
    res.status(404)
    return res.json(
      {
       message: "Spot Image couldn't be found"
      }
    )
  }
  const spotId = currentSpotImage.spotId
  const spotCheck = await Spot.findByPk(spotId)
  const spotOwnerId = spotCheck.ownerId

  if (req.user.id !== spotOwnerId) {
    res.status(403);
    return res.json({
      message: "Forbidden"
    });
  }

  await currentSpotImage.destroy()
  res.status(200)
  return res.json(
    {
      message: "Successfully deleted"
    }
  )
})


module.exports = router;
