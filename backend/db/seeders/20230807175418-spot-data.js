'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}


const locations = [
  { city: 'New York', state: 'New York', lat: 40.7128, lng: -74.0060 },
  { city: 'Los Angeles', state: 'California', lat: 34.0522, lng: -118.2437 },
  { city: 'Chicago', state: 'Illinois', lat: 41.8781, lng: -87.6298 },
  { city: 'Houston', state: 'Texas', lat: 29.7604, lng: -95.3698 },
  { city: 'Phoenix', state: 'Arizona', lat: 33.4484, lng: -112.0740 },
  { city: 'Philadelphia', state: 'Pennsylvania', lat: 39.9526, lng: -75.1652 },
  { city: 'San Antonio', state: 'Texas', lat: 29.4241, lng: -98.4936 },
  { city: 'San Diego', state: 'California', lat: 32.7157, lng: -117.1611 },
  { city: 'Dallas', state: 'Texas', lat: 32.7767, lng: -96.7970 },
  { city: 'San Jose', state: 'California', lat: 37.3382, lng: -121.8863 },
  { city: 'Austin', state: 'Texas', lat: 30.2672, lng: -97.7431 },
  { city: 'Jacksonville', state: 'Florida', lat: 30.3322, lng: -81.6557 },
  { city: 'Fort Worth', state: 'Texas', lat: 32.7555, lng: -97.3308 },
  { city: 'Columbus', state: 'Ohio', lat: 39.9612, lng: -82.9988 },
  { city: 'Charlotte', state: 'North Carolina', lat: 35.2271, lng: -80.8431 },
  { city: 'San Francisco', state: 'California', lat: 37.7749, lng: -122.4194 },
  { city: 'Indianapolis', state: 'Indiana', lat: 39.7684, lng: -86.1581 },
  { city: 'Seattle', state: 'Washington', lat: 47.6062, lng: -122.3321 },
  { city: 'Denver', state: 'Colorado', lat: 39.7392, lng: -104.9903 },
  { city: 'Washington', state: 'DC', lat: 38.9072, lng: -77.0369 },
  { city: 'Boston', state: 'Massachusetts', lat: 42.3601, lng: -71.0589 },
  { city: 'El Paso', state: 'Texas', lat: 31.7619, lng: -106.4850 },
  { city: 'Detroit', state: 'Michigan', lat: 42.3314, lng: -83.0458 },
  { city: 'Nashville', state: 'Tennessee', lat: 36.1627, lng: -86.7816 },
  { city: 'Portland', state: 'Oregon', lat: 45.5051, lng: -122.6750 },
  { city: 'Memphis', state: 'Tennessee', lat: 35.1495, lng: -90.0490 },
  { city: 'Oklahoma City', state: 'Oklahoma', lat: 35.4676, lng: -97.5164 },
  { city: 'Las Vegas', state: 'Nevada', lat: 36.1699, lng: -115.1398 }
];


function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSpot(ownerId) {
  const { city, state, lat, lng } = getRandomElement(locations);

  return {
    ownerId,
    address: `Generated Address for Owner ${ownerId}`,
    city,
    state,
    country: "United States of America",
    lat,
    lng,
    name: `Generated Spot ${Math.random().toString(36).substring(7)}`,
    description: "This is a generated spot description.",
    price: Math.floor(Math.random() * 500) + 100
  };
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const spots = [];
    for (let ownerId = 1; ownerId <= 7; ownerId++) {
      for (let i = 0; i < 4; i++) {
        spots.push(generateSpot(ownerId));
      }
    }

    await Spot.bulkCreate(spots, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  },
};
