'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

// Function to generate a random image URL
function generateImageUrl(reviewId) {
  // Adjust the URL format to match your requirements
  const imageUrlBase = "https://a0.muscache.com/im/pictures/";
  const imageId = 49732403 + reviewId; // Example way to generate unique IDs for images
  const imageUrlSuffix = "_original.jpg?im_w=720";

  return {
    reviewId,
    url: imageUrlBase + imageId + imageUrlSuffix
  };
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const reviewImages = [];
    const numberOfReviews = 10; // Adjust this number based on the actual number of reviews in your database

    for (let reviewId = 1; reviewId <= numberOfReviews; reviewId++) {
      reviewImages.push(generateImageUrl(reviewId));
    }

    await ReviewImage.bulkCreate(reviewImages, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return queryInterface.bulkDelete(options, null, {});
  },
};
