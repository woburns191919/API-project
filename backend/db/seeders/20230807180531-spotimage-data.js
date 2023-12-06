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
      url: "https://a0.muscache.com/im/pictures/fb5dc81f-b19b-4cea-ac1a-ea4a57d25249.jpg?im_w=960",
      preview: true
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/6e10cfc4-eb72-415b-95ad-2b4d1009f5a1.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/dc9b7132-ea59-41d0-9a82-d2610e772931.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/f0303cd7-5cc3-4853-83e8-4e2103ec09c6.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/d8fad12c-8597-4647-ac04-83a4a1bd8770.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/622644cc-dd19-4e4d-a260-749cd55f8b7e.jpg?im_w=960",
      preview: true
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/5dd5247a-0676-4bbe-8cb9-ed9ab087879f.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/cfc940fc-f3da-476a-b021-a38712de0753.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/ce685bcf-79e2-4c84-9224-90f9abace9af.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/60d4058e-98a8-4f30-ba8a-93b101a31c47.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/e8d2fb88-019a-42db-919b-e007f9c11eea.jpg?im_w=960",
      preview: true
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-46775194/original/a8045571-8fd1-4b77-96b5-9b1c9f3645dd.jpeg?im_w=480",
      preview: false
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-46775194/original/5e66d8ce-b9f8-4038-b6af-b212322fbe77.jpeg?im_w=480",
      preview: false
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/2a1ef0d3-1427-4f9c-a2ff-82e822caf39d.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/902f6bb4-b3ec-4dd6-a74d-ecbb8008aad9.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-39663644/original/a80e270f-e366-49c4-8fff-ea5da49de54f.jpeg?im_w=960",
      preview: true
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/da6c0ca7-6541-4a0c-9639-2f9745503962.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/9a7888a5-bdbd-4d46-8e5b-ec501c0abe96.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/2215423b-d2b1-4c5d-86d1-9aa65138e288.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-39663644/original/0608f099-4f2b-4803-9cd7-bcd48a0bdc06.jpeg?im_w=480",
      preview: false
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/96143231-6c1e-4db4-b75a-cebaf74b1db8.jpg?im_w=960",
      preview: true
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/96143231-6c1e-4db4-b75a-cebaf74b1db8.jpg?im_w=960",
      preview: false
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/96143231-6c1e-4db4-b75a-cebaf74b1db8.jpg?im_w=960",
      preview: false
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/96143231-6c1e-4db4-b75a-cebaf74b1db8.jpg?im_w=960",
      preview: false
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/96143231-6c1e-4db4-b75a-cebaf74b1db8.jpg?im_w=960",
      preview: false
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/709285e7-0b31-456d-a20c-8273fcafa0a5.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/709285e7-0b31-456d-a20c-8273fcafa0a5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/709285e7-0b31-456d-a20c-8273fcafa0a5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/709285e7-0b31-456d-a20c-8273fcafa0a5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/709285e7-0b31-456d-a20c-8273fcafa0a5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/0b774bb1-280e-4fbe-926e-64233d661929.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/0b774bb1-280e-4fbe-926e-64233d661929.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/0b774bb1-280e-4fbe-926e-64233d661929.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/0b774bb1-280e-4fbe-926e-64233d661929.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/0b774bb1-280e-4fbe-926e-64233d661929.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/04c9b613-6608-40ee-af7b-fd368c052b56.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/04c9b613-6608-40ee-af7b-fd368c052b56.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/04c9b613-6608-40ee-af7b-fd368c052b56.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/04c9b613-6608-40ee-af7b-fd368c052b56.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/04c9b613-6608-40ee-af7b-fd368c052b56.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: true
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/6971e553-ee6f-4953-8d8b-6c83a310ebe5.jpg?im_w=480",
      preview: false
    },
   ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
  
    return queryInterface.bulkDelete(options, {});
  },
};
