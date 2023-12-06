'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

// Function to generate a random date within a range
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Function to generate a booking
function generateBooking(spotId, userId) {
  const startDate = randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31));
  const endDate = new Date(startDate.getTime() + (Math.floor(Math.random() * 7) + 1) * 24 * 60 * 60 * 1000); // Add 1-7 days

  return {
    spotId,
    userId,
    startDate: startDate.toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
    endDate: endDate.toISOString().split('T')[0]
  };
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const bookings = [];
    for (let spotId = 1; spotId <= 28; spotId++) {
      for (let userId = 1; userId <= 7; userId++) {
        bookings.push(generateBooking(spotId, userId));
      }
    }

    await Booking.bulkCreate(bookings, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, null, {});
  },
};
