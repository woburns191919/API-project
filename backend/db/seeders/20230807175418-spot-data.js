'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

function generateSpot(ownerId) {


  return {
    ownerId,
    address: `Generated Address for Owner ${ownerId}`,
    city: "City",
    state: "State",
    country: "United States of America",
    lat: Math.random() * 90,
    lng: Math.random() * 180,
    name: `Generated Spot ${Math.random().toString(36).substring(7)}`,
    description: "This is a generated spot description.",
    price: Math.floor(Math.random() * 500) + 100
  };
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const spots = [];
    for (let ownerId = 1; ownerId <= 7; ownerId++) {
      for (let i = 0; i < 4; i++) {
        spots.push(generateSpot(ownerId));
      }
    }

    await Spot.bulkCreate(spots, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  },
};
