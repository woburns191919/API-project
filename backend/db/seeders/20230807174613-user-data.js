"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

function generateUser(email, username, password, firstName, lastName) {
  return {
    email,
    username,
    hashedPassword: bcrypt.hashSync(password),
    firstName,
    lastName,
  };
}
const users = [
  generateUser(
    "Oblivion@gmail.com",
    "Oblivion",
    "mrsquishy",
    "David",
    "Fosterwallace"
  ),
  generateUser(
    "biggie@gmail.com",
    "biggie",
    "bigpappa",
    "Christopher",
    "Wallace"
  ),
  generateUser("nas@hotmail.com", "nas", "queensbridge", "Nasir", "Jones"),
  generateUser(
    "whereareyougoing@gmail.com",
    "whereareyougoing",
    "prolific",
    "Joyce",
    "Caroloates"
  ),
  generateUser(
    "unsafejobs@gmail.com",
    "unsafejobs",
    "gnomes",
    "Alissa",
    "Nutting"
  ),
  generateUser(
    "arrangedmarriages@gmail.com",
    "arrangedmarriages",
    "before",
    "Chitra",
    "Divakaruni"
  ),
  generateUser(
    "therethere@gmail.com",
    "therethere",
    "channelorange",
    "Tommy",
    "Orange"
  ),

];

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await User.bulkCreate(users, { validate: true });
    } catch (error) {
      console.error("Seeding error:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        firstName: {
          [Op.in]: [
            "David",
            "Christopher",
            "Nasir",
            "Joyce",
            "Alissa",
            "Chitra",
            "Tommy",
          ],
        },
      },
      {}
    );
  },
};
