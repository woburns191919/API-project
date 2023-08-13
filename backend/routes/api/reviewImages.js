const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User, Spot, Review, SpotImage, Booking, ReviewImage } = require("../../db/models");
const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

router.delete('/:imageId', requireAuth, async (req, res) => {
  const currentReviewImage = await ReviewImage.findByPk(req.params.imageId)

  if (!currentReviewImage) {
    res.status(404)
    return res.json(
      {
        message: "Review Image couldn't be found"
      }
    )
  }
  const reviewId = currentReviewImage.reviewId
  const reviewCheck = await Review.findByPk(reviewId)
  const reviewUserId = reviewCheck.userId

  if (req.user.id !== reviewUserId) {
    res.status(403)
    return res.json({
      message: "Forbidden"
    });
  }

  await currentReviewImage.destroy()
  res.status(200)
  return res.json(
    {
      message: "Successfully deleted"
    }
  )
})



module.exports = router;
