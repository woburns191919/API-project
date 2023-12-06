'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

// Function to generate a random review
function generateReview(spotId, userId) {
  const reviews = [
    "Great experience, would definitely come back!",
    "It was okay, but had some issues.",
    "Not great, wouldn't recommend.",
    "Amazing place, exceeded expectations!",
    "Average experience, nothing special."
  ];
  const randomReview = reviews[Math.floor(Math.random() * reviews.length)];

  return {
    spotId,
    userId,
    review: randomReview,
    stars: Math.floor(Math.random() * 5) + 1
  };
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const reviews = [];
    for (let spotId = 1; spotId <= 28; spotId++) { // Loop for 28 spots
      for (let userId = 1; userId <= 7; userId++) { // Loop for 7 users
        reviews.push(generateReview(spotId, userId));
      }
    }

    await Review.bulkCreate(reviews, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Reviews";
    // Delete reviews for all 28 spots
    return queryInterface.bulkDelete(options, { spotId: [...Array(28).keys()].map(i => i + 1) }, {});
  },
};
