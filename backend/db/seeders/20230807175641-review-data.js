'use strict';

const { Review } = require('../models')

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
   await Review.bulkCreate([
    {
      id: 1,
      spotId: 1,
      userId: 1,
      review: "It was great!",
      stars: 4
    },
    {
      id: 2,
      spotId: 2,
      userId: 2,
      review: "It was okay",
      stars: 3
    },
    {
      id: 3,
      spotId: 3,
      userId: 3,
      review: "It was not good",
      stars: 2
    },
    {
      id: 4,
      spotId: 1,
      userId: 3,
      review: "It was not that good",
      stars: 2
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
     options.tableName = "Reviews"
     return queryInterface.bulkDelete(
       options,
       {
         spotId: [1, 2, 3]
       },
       {}
     );
   },
 };
