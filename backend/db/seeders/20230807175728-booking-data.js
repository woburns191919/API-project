'use strict';

const { Booking } = require('../models')


let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Booking.bulkCreate([
    {
      spotId: 1,
      userId: 1,
      startDate: '2023-08-18',
      endDate: '2023-08-20'
    },
    {
      spotId: 2,
      userId: 2,
      startDate: '2023-09-18',
      endDate: '2023-09-20'
    },
    {
      spotId: 3,
      userId: 3,
      startDate: '2023-10-20',
      endDate: '2023-10-24'
    },
    {
      spotId: 1,
      userId: 2,
      startDate: '2023-07-10',
      endDate: '2023-07-12'
    },
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
    options.tableName = "Bookings"
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        startDate: {
          [Op.in]: ['2023-08-18', '2023-09-18', '2023-10-20', '2023-07-10'],
        },
      },
      {}
    );
  },
};
