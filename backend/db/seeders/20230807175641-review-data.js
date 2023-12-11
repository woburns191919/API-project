"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const reviewParts = {
  positive: {
    starts: [
      "Had a great time",
      "My experience was wonderful",
      "I found the place delightful",
    ],
    middles: [
      "and would definitely come back.",
      ",exceeding my expectations.",
      "and I thoroughly enjoyed every moment.",
    ],
    ends: [
      "Overall, a fantastic stay!",
      "Highly recommend it!",
      "Can't wait to return!",
    ],
  },
  neutral: {
    starts: [
      "My experience was average",
      "I found the place to be okay",
      "The place was as expected",
    ],
    middles: [
      "but had a few minor issues.",
      "nothing special but not bad either.",
      "and it met my basic needs.",
    ],
    ends: [
      "Overall, it was just okay.",
      "Might come back, might not.",
      "An average experience.",
    ],
  },
  negative: {
    starts: [
      "Had a disappointing time",
      "My experience was underwhelming",
      "I found the place lacking",
    ],
    middles: [
      "and wouldn't recommend it.",
      "falling short of my expectations.",
      "with several issues encountered.",
    ],
    ends: ["Overall, a letdown.", "Wouldn't go back.", "Could be much better."],
  },
};

function generateReview(spotId, userId) {
  const tone = ["positive", "neutral", "negative"][
    Math.floor(Math.random() * 3)
  ];
  const chosenParts = reviewParts[tone];

  const randomReview = [
    chosenParts.starts[Math.floor(Math.random() * chosenParts.starts.length)],
    chosenParts.middles[Math.floor(Math.random() * chosenParts.middles.length)],
    chosenParts.ends[Math.floor(Math.random() * chosenParts.ends.length)],
  ].join(" ");

  return {
    spotId,
    userId,
    review: randomReview,
    stars: Math.floor(Math.random() * 5) + 1,
  };
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const reviews = [];
    for (let spotId = 1; spotId <= 28; spotId++) {
      for (let userId = 1; userId <= 7; userId++) {
        if (Math.random() > 0.3) {
          reviews.push(generateReview(spotId, userId));
        }
      }
    }

    await Review.bulkCreate(reviews, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options, null, {});
  },
};
