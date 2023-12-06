'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}


const reviewStarts = [
  "Had a great time",
  "My experience was",
  "I found the place"
];
const reviewMiddles = [
  "and would definitely come back",
  "but had a few issues",
  "and wouldn't recommend it",
  "exceeding my expectations",
  "nothing special"
];
const reviewEnds = [
  "Overall, a fantastic stay!",
  "Could be better.",
  "Wouldn't go back.",
  "Highly recommend it!",
  "It was just okay."
];

// Function to generate a random review
function generateReview(spotId, userId) {
  // Combine parts of the review randomly
  const randomReview = [
    reviewStarts[Math.floor(Math.random() * reviewStarts.length)],
    reviewMiddles[Math.floor(Math.random() * reviewMiddles.length)],
    reviewEnds[Math.floor(Math.random() * reviewEnds.length)]
  ].join(' ');

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
    for (let spotId = 1; spotId <= 28; spotId++) {
      for (let userId = 1; userId <= 7; userId++) {
        // Randomly decide whether a user leaves a review for a spot
        if (Math.random() > 0.3) { // 70% chance of leaving a review
          reviews.push(generateReview(spotId, userId));
        }
      }
    }

    await Review.bulkCreate(reviews, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options, null, {});
  },
};
