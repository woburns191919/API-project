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
      ownerId: 1,
      address: "140 Washington St",
      city: "New York",
      state: "New York",
      country: "United States of America",
      lat: 40.71020,
      lng: -74.01402,
      name: "Club Quarters Hotel",
      description: "Great place to stay in the city",
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
         ownerId: 1
       },
       {}
     );
   },
 };
