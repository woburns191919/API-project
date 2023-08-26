'use strict';

const { Spot } = require('../models')


let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await Spot.bulkCreate([
    {
      ownerId: 2,
      address: "140 Washington St",
      city: "New York",
      state: "New York",
      country: "United States of America",
      lat: 40.71020,
      lng: -74.01402,
      name: "Club Quarters Hotel",
      description: "Great place to stay in the city",
      price: 200
    },
    {
      ownerId: 3,
      address: "200 Congress Pl",
      city: "Cape May",
      state: "New Jersey",
      country: "United States of America",
      lat: 38.93204,
      lng: -74.92321,
      name: "Congress Hall",
      description: "Classy place in Cape May",
      price: 300
    },
    {
      ownerId: 4,
      address: "400 E Capitol Ave",
      city: "Little Rock",
      state: "Arkansas",
      country: "United States of America",
      lat: 34.74513,
      lng: -92.26761,
      name: "Hilton Garden Inn",
      description: "Nice spot by the river",
      price: 200
    },
    {
      ownerId: 3,
      address: "300 Kansas st",
      city: "Baileyville",
      state: "Kansas",
      country: "United States of America",
      lat: 38.74513,
      lng: -90.26761,
      name: "Zome on the Range",
      description: "Nice zome",
      price: 400
    },
    {
      ownerId: 4,
      address: "20 Montana St",
      city: "Bozeman",
      state: "Montana",
      country: "United States of America",
      lat: 38.74513,
      lng: -91.26761,
      name: "Silo",
      description: "Nice silo",
      price: 200
    }
   ], { validate: true }
   );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     options.tableName = "Spots"
     return queryInterface.bulkDelete(
       options,
       {
         ownerId: [1, 2, 3]
       },
       {}
     );
   },
 };
