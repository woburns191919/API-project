'use strict';
const { SpotImage } = require('../models')

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
   await SpotImage.bulkCreate([
    {
      spotId: 1,
      url: "https://goo.gl/maps/M9THTWLbaNCJ81Gk7",
      preview: true
    },
    {
      spotId: 2,
      url: "https://lh5.googleusercontent.com/p/AF1QipPAOH3BgKfLFkQkdnXZ8xv1LwN2ydcKaRnrmqDV=w408-h271-k-no",
      preview: true
    },
    {
      spotId: 3,
      url: "https://lh6.googleusercontent.com/proxy/KtqzIV2vfy4jr-K-InDZBCLhvysMQHIpPSnnfDJJ8--KOZxHhTWKDitieUkPDpa8bcykwrDYrHWuxcO0fHi14XXCXsX3koH6E8usY71AhjaC15Xe9xUPh4dPeGXl_3P87IerWnx6cxW-9nWOOaAz4gmP-P5Gzgs=w253-h169-k-no",
      preview: true
    }
   ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     options.tableName = "SpotImages"
     return queryInterface.bulkDelete(
       options,
       {
         spotId: [1, 2, 3]
       },
       {}
     );
   },
 };
