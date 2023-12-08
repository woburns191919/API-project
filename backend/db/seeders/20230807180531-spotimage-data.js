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
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-39908051/original/daac00ba-94c7-4097-b485-e4c6424d495f.jpeg?im_w=480",
      preview: false
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-39908051/original/1a126a4c-287a-41d1-bba7-15c12484bf0f.jpeg?im_w=480",
      preview: false
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/09407078-8914-4920-801e-df7e096c0782.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 10,
      url: "https://a0.muscache.com/im/pictures/e7e1f6b2-fe37-47e3-88ae-63407649d027.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-835676990889833027/original/8c2d4b1b-13e1-44c6-8c19-3ed8a70c0176.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-835676990889833027/original/e3c3655e-f79f-41da-87c6-b08be6e4c4b2.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-835676990889833027/original/4af10a04-16f8-40c8-a93b-1d378a739aab.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-835676990889833027/original/6b3c504d-9668-4e68-a80c-97d13bd626b3.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 11,
      url: "https://a0.muscache.com/im/pictures/31a82755-8551-4244-a5eb-1e121da2ba8b.jpg?im_w=720",
      preview: false
    },
    // Spot 12
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/801dfc86-b2f9-410b-8e35-d6dddf19aec0.jpg?im_w=720",
      preview: true
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-795218549847735811/original/0daa4a35-e611-4526-9ae7-8b78415f3330.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/b214b0ac-f546-4fe6-a1f1-7b30c69eadc3.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/82bd2f42-0f56-4d7b-b08c-d97d92db50eb.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 12,
      url: "https://a0.muscache.com/im/pictures/7fba0965-267b-4cd3-950a-a1f77ab6465c.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/42787504-1b0b-4c2b-830e-8bd31aaaa473.jpg?im_w=720",
      preview: true
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-44591943/original/93b6cc6c-bffd-4578-b4ba-8d1a49eed426.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-50378380/original/d486212d-15e6-45db-b894-94eb5022a7f5.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/d103723e-6cfc-4796-9e30-5cc4a837614e.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 13,
      url: "https://a0.muscache.com/im/pictures/31160de6-b09e-45d9-b9e5-5caf2d59dfd7.jpg?im_w=720",
      preview: false
    },
    // Spot 14
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/fa6d2e1f-6864-43c7-90bf-e122a6663277.jpg?im_w=720",
      preview: true
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/a7a515a1-6667-4cfa-ad88-3da3accf2520.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-23468420/original/32cdcbdb-3969-44b7-afd9-552995e22795.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-23468420/original/f2413a39-9485-459d-b089-3aa33258baf2.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 14,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-23468420/original/46b447f9-ad7a-4b8e-82cf-0c8202c74868.jpeg?im_w=720",
      preview: false
    },
    // Spot 15
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-53330377/original/d0f457b3-6244-41ad-a7e8-95c2c86cf158.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-53330377/original/fbce6fd7-6934-4cb3-a3af-e50c4e54afcc.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-53330377/original/759928fe-a6b8-45ed-a554-c8fe4951be51.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-53330377/original/0c82083e-b8f7-46b5-986a-cf7078e26115.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 15,
      url: "https://a0.muscache.com/im/pictures/677123fa-97ca-4c6b-9688-97724092697a.jpg?im_w=720",
      preview: false
    },
    // Spot 16
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/1c106eda-d561-4d43-87dc-baed95293c98.jpg?im_w=720",
      preview: true
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/668640ff-5b3c-4133-8361-3b14bd70444c.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/f07c6592-8896-400b-88c4-b4c562c1c37e.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/f07c6592-8896-400b-88c4-b4c562c1c37e.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 16,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-677404133188804032/original/5250214c-c1c0-4f4e-87ec-0198891e2944.jpeg?im_w=720",
      preview: false
    },
    // Spot 17
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-677404133188804032/original/2f64d8e5-e842-4dff-966d-a822eca3f5d1.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-677404133188804032/original/134ede7d-8b36-444a-97a4-175b449e71fe.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-677404133188804032/original/78f72c32-a0af-456f-a2b9-115ad4479300.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-26564570/original/308a6149-f61d-4546-a591-e3a0119394a1.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 17,
      url: "https://a0.muscache.com/im/pictures/99560e13-048c-4c1e-97cb-22288c0064f4.jpg?im_w=720",
      preview: false
    },
    // Spot 18
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/a1f6865f-072d-450a-883c-35cf311a00d4.jpg?im_w=720",
      preview: true
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-39908051/original/daac00ba-94c7-4097-b485-e4c6424d495f.jpeg?im_w=480",
      preview: false
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-39908051/original/1a126a4c-287a-41d1-bba7-15c12484bf0f.jpeg?im_w=480",
      preview: false
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/09407078-8914-4920-801e-df7e096c0782.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 18,
      url: "https://a0.muscache.com/im/pictures/e7e1f6b2-fe37-47e3-88ae-63407649d027.jpg?im_w=480",
      preview: false
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/33af23f6-aaf5-4fc3-94c5-706fdff223a8.jpg?im_w=720",
      preview: true
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/3d0ce778-c89f-4c00-89dc-e43a9d38424a.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/3fc20c57-02e3-4f5b-a937-8ffd5d8f0972.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-54263489/original/7cc2c288-f5a6-4abc-ab20-84ea7fb5b662.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 19,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-54263489/original/528ec5d8-1e7c-44ca-afd3-3193e419ddad.jpeg?im_w=720",
      preview: false
    },

    // Spot 20
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-54263489/original/d81eb9c8-8004-4ad4-80bb-17a215aea760.jpeg?im_w=720",
      preview: true
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-54263489/original/0d9c1129-ebbc-46c1-9121-e7c6efd72e8e.jpeg?im_w=720",
      preview: false
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/99560e13-048c-4c1e-97cb-22288c0064f4.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/a1f6865f-072d-450a-883c-35cf311a00d4.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 20,
      url: "https://a0.muscache.com/im/pictures/d845e0a4-fb92-44be-ba6d-ab6e3e67642b.jpg?im_w=720",
      preview: false
    },



   ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";

    return queryInterface.bulkDelete(options, {});
  },
};
