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
      url: "https://a0.muscache.com/im/pictures/a2d7a421-e297-4e30-83a1-1a2f3697e049.jpg?im_w=720",
      preview: true
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-36879397/original/496f5616-a9e9-490f-8692-9340f22e905a.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-36879397/original/e5157b1a-efb9-4e21-adda-9e0512c4e904.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/3f7577d3-7325-443f-80af-93f49b60fd8a.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/84287da2-d663-4ce2-97ec-5f243f6a0755.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-747005754223931945/original/b65ce096-517a-479c-9569-f7e1f0049dc4.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-730275267384007168/original/ec37d31e-17e2-4c23-9d89-e5de2efcac2e.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/a485fe14-4a7f-4693-9786-c91cd77538e5.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/16c9b79b-dbe9-4a31-9047-4e98be9634e0.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-51556351/original/a5fee004-290d-4f7a-b70e-11df3cb4f291.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-23565941/original/213e53a2-f220-4ff2-b7ac-8e5eb19f3fd8.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-52968457/original/ab9c4da8-6fc2-40cd-b1e5-276318933ada.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-52968457/original/615f1d85-84dd-4299-aa1c-5fbf21607184.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-52968457/original/ce993b06-0e49-4eae-a29e-0eea2797c688.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-52968457/original/a3f48ff4-1e46-4bdd-a8c0-7f24c3c6db09.jpeg?im_w=720",
      preview: false
    },
    // Spot 6
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-51641727/original/42ff99dc-fd78-404b-9b1a-34ca5d5c156d.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-735522754021394347/original/80ad00dc-94c0-4694-a91b-88a9a9052e69.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-735522754021394347/original/da3dd971-234d-4c7a-8d6f-8d81f8286d9f.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-735522754021394347/original/85b84b95-c501-4eec-8061-ce4273e38d74.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-735522754021394347/original/f66b711a-d201-4008-8a3b-76235221f9f3.jpeg?im_w=720",
      preview: false
    },
    // Spot 7
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-793563509178343212/original/0e4307b0-1ae3-4636-9122-46879e23157c.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-29075191/original/6d481b91-4715-4b61-bc88-9dc7fb0f98a1.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-29075191/original/7d1a3137-5609-4674-9cb2-31945c791b27.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-29075191/original/67969559-5bdc-4f89-9283-c131afa557f7.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-29075191/original/579c8eff-f035-4544-b332-5d486ca5c6a7.jpeg?im_w=720",
      preview: false
    },
    // Spot 8
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/0bf92059-e4c9-488b-8414-002b196504e4.jpg?im_w=720",
      preview: true
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/monet/Select-27935471/original/cb46b9c7-1ead-46a3-9ba9-986885380293?im_w=720",
      preview: false
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/542fe88a-1a0c-40a8-ae19-379740492029.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/monet/Select-27935471/original/c17981fd-ad24-4b13-9697-00b4f367a459?im_w=720",
      preview: false
    },
    {
      spotId: 8,
      url: "https://a0.muscache.com/im/pictures/monet/Select-27935471/original/e9c60a53-7256-46f3-a514-3a143fe8bf1b?im_w=720",
      preview: false
    },
    // Spot 9
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/340a3ff2-d182-40e5-b884-f4ec903b2cb1.jpg?im_w=720",
      preview: true
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-608657315248099779/original/ef0671e0-0b3e-412d-a47a-fa639694aa89.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-608657315248099779/original/a4afa0ce-6793-47eb-9a18-789358817430.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-608657315248099779/original/1f72249a-c973-4476-954a-7ce3c07fdbd0.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 9,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-608657315248099779/original/0d4726bd-727f-4b3b-8bb2-63582a6fcb5c.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/50ff9660-1cca-4c92-9c62-96b3c89fff73.jpg?im_w=720",
      preview: true
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-753870390387515592/original/5ab40b56-2f65-47fa-bfa8-eeb606c04f76.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-766017496229174906/original/69612549-f5b3-4208-a7f0-65a153a338ad.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/d60a0082-8737-4653-92b2-ffd73b44f35c.jpg?im_w=720",
      preview: true
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-13903824/original/82d996fb-d7c4-46a8-a713-febd281cd69f.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/8ff2a532-e0cd-41a2-9164-554c4d9eb28a.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-742424658135898180/original/ef5464ea-5eb8-426a-a097-a4ed7a395610.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/0da70267-d9da-4efb-9123-2714b651c9fd.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-53505989/original/607235e0-45d3-4450-b507-b9b0477d68d9.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/2fd67464-8da1-419d-b8f7-dcb840a1be0a.jpg?im_w=720",
      preview: true
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/airflow/Hosting-1112254/original/e6bed0e6-6190-4119-bd80-d12d369cea19.jpg?im_w=720",
      preview: true
    }



   ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";

    return queryInterface.bulkDelete(options, {});
  },
};
