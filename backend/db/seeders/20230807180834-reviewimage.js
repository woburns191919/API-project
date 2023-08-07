'use strict';

const { ReviewImage } = require('../models')

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
   await ReviewImage.bulkCreate([
    {
      reviewId: 1,
      url: "https://www.tripadvisor.com/Hotel_Review-g60763-d1595302-Reviews-Club_Quarters_Hotel_World_Trade_Center_New_York-New_York_City_New_York.html"
    },
    {
      reviewId: 2,
      url: "https://www.tripadvisor.com/Hotel_Review-g46341-d92337-Reviews-Congress_Hall-Cape_May_Cape_May_County_New_Jersey.html#REVIEWS"
    },
    {
      reviewId: 3,
      url: "https://www.google.com/maps/contrib/105380432848278288786/reviews/@34.9166531,-100.4145595,5z/data=!3m1!4b1!4m3!8m2!3m1!1e1?hl=en-US&entry=ttu"
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
     options.tableName = "ReviewImages"
     return queryInterface.bulkDelete(
       options,
       {
         reviewId: [1, 2, 3]
       },
       {}
     );
   },
 };
