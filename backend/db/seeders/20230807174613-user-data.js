"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await User.bulkCreate(
      [
        {
          email: "Oblivion@gmail.com",
          username: "Oblivion",
          hashedPassword: bcrypt.hashSync("mrsquishy"),
          firstName: "David",
          lastName: "Fosterwallace",
        },
        {
          email: "biggie@gmail.com",
          username: "biggie",
          hashedPassword: bcrypt.hashSync("bigpappa"),
          firstName: "Christopher",
          lastName: "Wallace",
        },
        {
          email: "junot@gmail.com",
          username: "Junot",
          hashedPassword: bcrypt.hashSync("asteroid"),
          firstName: "Junot",
          lastName: "Diaz",
        },
        {
          email: "emergency@hotmail.com",
          username: "emergency",
          hashedPassword: bcrypt.hashSync("jesusson"),
          firstName: "Denis",
          lastName: "Johnson",
        },
        // {
        //   email: "nas@hotmail.com",
        //   username: "nas",
        //   hashedPassword: bcrypt.hashSync("queensbridge"),
        //   firstName: "Nasir",
        //   lastName: "Jones",
        // },
        // {
        //   email: "whereareyougoing@gmail.com",
        //   username: "whereareyougoing",
        //   hashedPassword: bcrypt.hashSync("prolific"),
        //   firstName: "Joyce",
        //   lastName: "Caroloates",
        // },
        // {
        //   email: "unsafejobs@gmail.com",
        //   username: "unsafejobs",
        //   hashedPassword: bcrypt.hashSync("gnomes"),
        //   firstName: "Alissa",
        //   lastName: "Nutting",
        // },
        // {
        //   email: "arrangedmarriages@gmail.com",
        //   username: "arrangedmarriages",
        //   hashedPassword: bcrypt.hashSync("before"),
        //   firstName: "Chitra",
        //   lastName: "Divakaruni",
        // },
        // {
        //   email: "therethere@gmail.com",
        //   username: "therethere",
        //   hashedPassword: bcrypt.hashSync("channelorange"),
        //   firstName: "Tommy",
        //   lastName: "Orange",
        // },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        firstName: {
          [Op.in]: ["David", "Christopher", "Junot", "Denis"]
        },
      },
      {}
    );
  },
};
