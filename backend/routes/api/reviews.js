const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const {
  User,
  Spot,
  Review,
  SpotImage,
  Booking,
  ReviewImage,
} = require("../../db/models");
const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");



router.get("/current", requireAuth, async (req, res) => {
  let reviews = await Review.findAll({
    where: {
      id: req.user.id,
    },
    include: [
      {
        model: ReviewImage,
        attributes: [
          'id', 'url'
        ]

      },
      {
        model: Spot,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'description']
        },
          include: {
            model: SpotImage,
            where: {
              preview: true
            },
            limit: 1
          }
      },
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  });
  let reviewsArr = []
  reviews.forEach(reviews => {
    reviewsArr.push(reviews.toJSON())
  })
  reviewsArr.forEach(review => {
    review.Spot.previewImage = review.Spot.SpotImages[0].url
    delete review.Spot.SpotImages
  })
  // reviewsArr[0].Spot.previewImage = reviewsArr[0].Spot.SpotImages.url
  // console.log(reviewsArr[0].Spot.SpotImages[0].url)
  // console.log(reviews)
  res.json(reviewsArr)

});

router.post('/:reviewId/images', requireAuth, async (req, res) => {

  const review = await Review.findByPk(req.params.reviewId)
  if (!req.params.reviewId) {
    res.status(404)
    return res.json({
      message: "Review couldn't be found"
    })
  }

  if (review.id !== req.user.id) {
    res.status(403)
    return res.json({
      message: "Forbidden"
    })
  }
  const reviewImages = await ReviewImage.findAll()

  if (review.id === req.user.id && reviewImages.length <= 10) {
    const { url } = req.body;
    const newReviewImage = await ReviewImage.create({
      url
    })
    let newReviewImageObj = newReviewImage.toJSON()
    let deleteKeys = ['createdAt', 'updatedAt']
    deleteKeys.forEach(key => {
      delete newReviewImageObj[key]
    })
    return res.json(newReviewImageObj)
  } else if (review.id === req.user.id && reviewImages.length > 10) {
    res.status(403)
    return res.json(
      {
        message: "Maximum number of images for this resource was reached"
      }
    )
  }
})




module.exports = router;
