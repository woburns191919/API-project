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
      spotId: 1,
      userId: 2,
      review: "It was great! I watched movies in the jazucci, clearly.",
      stars: 4
    },
    {
      spotId: 2,
      userId: 2,
      review: "It was okay. Though I watched movies in the jacuzzi, I wasn't feeling it for some reason.",
      stars: 3
    },
    {
      spotId: 3,
      userId: 1,
      review: "It was not good; however, I wrote 'Infinite Jest' there.",
      stars: 5
    },
    {
      spotId: 4,
      userId: 3,
      review: "It was not that good. I just wrote more good books after the bad stay.",
      stars: 2
    },
    {
      spotId: 5,
      userId: 3,
      review: "It was not that good. I did not write any books there.",
      stars: 2
    },
    {
      spotId: 5,
      userId: 1,
      review: "Too many sub-marine creatures lurking on auto-pilot at extreme depths--not for me.",
      stars: 2
    },
    {
      spotId: 4,
      userId: 2,
      review: "The t-bone and welche's grape was what I ate.",
      stars: 5
    },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 1,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 3,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 4,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
    // {
    //   spotId: 5,
    //   userId: 3,
    //   review: "It was not that good",
    //   stars: 2
    // },
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
         spotId: [1, 2, 3, 4, 5]
       },
       {}
     );
   },
 };
