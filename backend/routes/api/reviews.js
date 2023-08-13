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

const reviewValidateEdit = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
  check("stars")
  .exists({ checkFalsy: true })
  .isFloat({ min: 1, max: 5 })
  .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
];


router.delete('/:reviewId', requireAuth, async (req, res) => {
  const review = req.params.reviewId
  const currReview = await Review.findByPk(req.params.reviewId)
  console.log(currReview)

  if (!currReview) {
    res.status(404)
    return res.json(
      {
        message: "Review couldn't be found"
      }
    );
  }

  const deletedReview = await Review.destroy({
    where: {
      id: req.params.reviewId,
      userId: currReview.userId
    }
  })

   if (currReview && currReview.userId !== req.user.id) {
    res.status(403)
    return res.json({
      message: 'Forbidden'
    });
  } else if (deletedReview) {
    res.status(200)
    return res.json({
      message: "Successfully deleted"
    })
  }
})



router.get("/current", requireAuth, async (req, res) => {
  let reviews = await Review.findAll({
    where: {
      userId: req.user.id,
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
  res.json({ "Reviews": reviewsArr })

});






router.put('/:reviewId', requireAuth, reviewValidateEdit, async (req, res) => {
  const findReview = await Review.findByPk(req.params.reviewId)
  if (!findReview) {
    res.status(404);
    return res.json(
      {
        message: "Review couldn't be found"
      }
      )
    }
    console.log(findReview)
    if (req.user.id === findReview.userId) {
      const { review, stars } = req.body
      await findReview.update({
        review,
        stars
      })
      await findReview.save()
      return res.json(findReview)
    } else if (req.user.id !== findReview.userId) {
    //  console.log(findReview.userId)
    res.status(403)
    return res.json(
      {
        message: "Forbidden"
      }
    )
   }
})








router.post('/:reviewId/images', requireAuth, async (req, res) => {

  const review = await Review.findByPk(req.params.reviewId)
  if (!review) {
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
      reviewId: req.params.reviewId,
      url
    })
    let newReviewImageObj = newReviewImage.toJSON()
    const newestReviewImage = await ReviewImage.findOne({
      where: newReviewImage.id,
      attributes: ['id', 'url']
    })
    console.log(newestReviewImage)
    let deleteKeys = ['createdAt', 'updatedAt', 'reviewId']
    deleteKeys.forEach(key => {
      delete newReviewImageObj[key]
    })
    return res.json(newestReviewImage)
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
