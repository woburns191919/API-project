"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

const locations = [
  { city: "New York", state: "New York", lat: 40.7128, lng: -74.006 },
  { city: "Los Angeles", state: "California", lat: 34.0522, lng: -118.2437 },
  { city: "Chicago", state: "Illinois", lat: 41.8781, lng: -87.6298 },
  { city: "Houston", state: "Texas", lat: 29.7604, lng: -95.3698 },
  { city: "Phoenix", state: "Arizona", lat: 33.4484, lng: -112.074 },
  { city: "Philadelphia", state: "Pennsylvania", lat: 39.9526, lng: -75.1652 },
  { city: "San Antonio", state: "Texas", lat: 29.4241, lng: -98.4936 },
  { city: "San Diego", state: "California", lat: 32.7157, lng: -117.1611 },
  { city: "Dallas", state: "Texas", lat: 32.7767, lng: -96.797 },
  { city: "San Jose", state: "California", lat: 37.3382, lng: -121.8863 },
  { city: "Austin", state: "Texas", lat: 30.2672, lng: -97.7431 },
  { city: "Jacksonville", state: "Florida", lat: 30.3322, lng: -81.6557 },
  { city: "Fort Worth", state: "Texas", lat: 32.7555, lng: -97.3308 },
  { city: "Columbus", state: "Ohio", lat: 39.9612, lng: -82.9988 },
  { city: "Charlotte", state: "North Carolina", lat: 35.2271, lng: -80.8431 },
  { city: "San Francisco", state: "California", lat: 37.7749, lng: -122.4194 },
  { city: "Indianapolis", state: "Indiana", lat: 39.7684, lng: -86.1581 },
  { city: "Seattle", state: "Washington", lat: 47.6062, lng: -122.3321 },
  { city: "Denver", state: "Colorado", lat: 39.7392, lng: -104.9903 },
  { city: "Washington", state: "DC", lat: 38.9072, lng: -77.0369 },
  { city: "Boston", state: "Massachusetts", lat: 42.3601, lng: -71.0589 },
  { city: "El Paso", state: "Texas", lat: 31.7619, lng: -106.485 },
  { city: "Detroit", state: "Michigan", lat: 42.3314, lng: -83.0458 },
  { city: "Nashville", state: "Tennessee", lat: 36.1627, lng: -86.7816 },
  { city: "Portland", state: "Oregon", lat: 45.5051, lng: -122.675 },
  { city: "Memphis", state: "Tennessee", lat: 35.1495, lng: -90.049 },
  { city: "Oklahoma City", state: "Oklahoma", lat: 35.4676, lng: -97.5164 },
  { city: "Las Vegas", state: "Nevada", lat: 36.1699, lng: -115.1398 },
];

function getSpotDescription(city) {
  switch (city) {
    case "New York":
      return "Experience the heart of Manhattan in our stylish, modern apartment. Located just steps away from Times Square, this cozy spot offers a quiet retreat with skyline views. Ideal for couples or solo adventurers, immerse yourself in the city that never sleeps.";
    case "Los Angeles":
      return "Discover the glamour of Hollywood in our chic, sunlit apartment in Los Angeles. Nestled in a tranquil neighborhood, minutes away from iconic landmarks, it's the perfect base for exploring the city's famous attractions. Ideal for families or a group of friends.";
    case "Chicago":
      return "Stay in the vibrant heart of Chicago with our luxurious, contemporary condo. Overlooking the bustling streets, this spot is a stone's throw away from the Magnificent Mile and world-class dining. Perfect for urban explorers and cultural enthusiasts.";
    case "Houston":
      return "Enjoy the diverse and lively spirit of Houston in our comfortable, modern home. Located in a vibrant neighborhood, this spot offers easy access to renowned museums and delightful cuisine. Great for families and business travelers alike.";
    case "Phoenix":
      return "Escape to our serene desert oasis in Phoenix. This charming spot is surrounded by stunning natural landscapes, offering a peaceful retreat from the hustle and bustle. Ideal for nature lovers and those seeking a quiet getaway.";
    case "Philadelphia":
      return "Explore the rich history of Philadelphia from our cozy, centrally-located apartment. Just moments away from historical landmarks, this spot is perfect for history buffs and urban adventurers.";
    case "San Antonio":
      return "Immerse yourself in the unique culture of San Antonio with our quaint, traditional home. Near the River Walk and historic missions, it's perfect for exploring local heritage and cuisine.";
    case "San Diego":
      return "Relax in our sunny San Diego beachfront apartment. With stunning ocean views and easy access to the beach, it’s an ideal spot for surfers, sunbathers, and families looking for a seaside escape.";
    case "Dallas":
      return "Experience the dynamic blend of urban sophistication and southern charm in our Dallas apartment. Located in the heart of the city, this spot is perfect for experiencing the vibrant nightlife and cultural attractions Dallas has to offer.";
    case "San Jose":
      return "Nestle into our cozy San Jose retreat, a tech lover's paradise in the heart of Silicon Valley. This spot offers a peaceful respite, with easy access to innovative museums and tech campuses.";
    case "Austin":
      return "Dive into the vibrant music and arts scene of Austin from our eclectic, centrally-located home. Known for its lively festivals and excellent food, Austin is a haven for creatives and foodies alike.";
    case "Jacksonville":
      return "Unwind in our Jacksonville beach house, where the city meets the sea. Enjoy the tranquil beaches and explore the bustling downtown, all within easy reach from this charming spot.";
    case "Fort Worth":
      return "Embrace the rich western heritage of Fort Worth in our rustic, yet modern home. Close to the famous Stockyards, this spot is perfect for experiencing the city's legendary rodeos and rich history.";
    case "Columbus":
      return "Discover Columbus from our modern apartment, located near the city's renowned cultural institutions and lush parks. It's a perfect spot for those seeking a blend of urban excitement and natural beauty.";
    case "Charlotte":
      return "Stay in our elegant Charlotte condo, offering a blend of southern hospitality and modern luxury. Near vibrant arts districts and lush greenways, it's an ideal base for exploring this charming city.";
    case "San Francisco":
      return "Enjoy breathtaking bay views from our San Francisco apartment, nestled in the heart of the city. Famous for its steep hills and eclectic architecture, this spot is perfect for an unforgettable urban adventure.";
    case "Indianapolis":
      return "Indulge in the charm of Indianapolis from our cozy, downtown apartment. Ideal for motorsport fans and cultural seekers, this spot offers proximity to the Speedway and enriching museums.";
    case "Seattle":
      return "Discover the lush, urban landscape of Seattle from our modern loft. Overlooking the iconic Space Needle, this spot is a dream for coffee enthusiasts and art lovers alike.";
    case "Denver":
      return "Breathe in the mountain air from our Denver retreat. Perfect for outdoor enthusiasts, this spot offers easy access to stunning hiking trails and the vibrant city life.";
    case "Washington":
      return "Immerse yourself in the history of the nation's capital from our Washington D.C. residence. Steps away from monumental landmarks, it's ideal for those seeking a cultural and historical journey.";
    case "Boston":
      return "Experience the blend of historic charm and modern living in our Boston apartment. Nestled in the heart of the city, this spot is perfect for exploring the Freedom Trail and savory seafood.";
    case "El Paso":
      return "Enjoy the unique blend of Texan and Mexican cultures in our El Paso home. Close to vibrant markets and authentic cuisine, it's a gateway to the beauty of the Southwest.";
    case "Detroit":
      return "Discover the revival of Detroit in our stylish, urban loft. Located in the rejuvenating downtown, it's perfect for experiencing the city's burgeoning art scene and automotive heritage.";
    case "Nashville":
      return "Soak in the soulful melodies of Music City from our Nashville abode. Ideal for country music fans and foodies, this spot is a stone's throw away from legendary music venues and southern cuisine.";
    case "Portland":
      return "Embrace the quirky, eco-friendly spirit of Portland in our charming spot. Known for its craft breweries and vibrant arts scene, it’s a haven for explorers seeking a unique urban experience.";
    case "Memphis":
      return "Dive into the rich musical history of Memphis from our downtown spot. Perfect for blues and rock 'n' roll enthusiasts, this location offers easy access to the famous Beale Street and Sun Studio.";
    case "Oklahoma City":
      return "Experience the blend of cowboy culture and contemporary life in Oklahoma City. Our spot is ideal for those interested in the Old West, offering a mix of rodeos, museums, and modern amenities.";
    case "Las Vegas":
      return "Indulge in the glitz and glamour of Las Vegas in our luxurious condo. Just off the Strip, it’s perfect for those looking to experience the city’s famous nightlife and entertainment.";
    default:
      return "This is a great spot--you sort of have to see it.";
  }
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getSpotName(city) {
  switch(city) {
    case "New York":
      return "Manhattan Skyline Retreat";
    case "Los Angeles":
      return "Hollywood Sunlit Haven";
    case "Chicago":
      return "Magnificent Mile Urban Loft";
    case "Houston":
      return "Houston Vibrant City Home";
    case "Phoenix":
      return "Phoenix Desert Oasis";
    case "Philadelphia":
      return "Historic Philly Cozy Corner";
    case "San Antonio":
      return "San Antonio Riverwalk Charm";
    case "San Diego":
      return "San Diego Beachfront Paradise";
    case "Dallas":
      return "Dallas Downtown Deluxe";
    case "San Jose":
      return "Silicon Valley Modern Hideaway";
    case "Austin":
      return "Austin Artsy Nook";
    case "Jacksonville":
      return "Jacksonville Seaside Getaway";
    case "Fort Worth":
      return "Fort Worth Western Retreat";
    case "Columbus":
      return "Columbus Urban Explorer's Flat";
    case "Charlotte":
      return "Charlotte’s Southern Comfort Condo";
    case "San Francisco":
      return "Golden Gate Cityscape Apartment";
    case "Indianapolis":
      return "Indy Speedway City Loft";
    case "Seattle":
      return "Seattle Space Needle Viewpoint";
    case "Denver":
      return "Denver Mountain High Residence";
    case "Washington":
      return "Capitol Hill Historic Stay";
    case "Boston":
      return "Boston Beacon Hill Hideaway";
    case "El Paso":
      return "El Paso Borderland Bungalow";
    case "Detroit":
      return "Detroit Motor City Loft";
    case "Nashville":
      return "Nashville Music Row Retreat";
    case "Portland":
      return "Portland Hipster Haven";
    case "Memphis":
      return "Memphis Blues City Pad";
    case "Oklahoma City":
      return "Oklahoma Western Gateway";
    case "Las Vegas":
      return "Vegas Neon Nights Suite";
    default:
      return "Unique City Spot";
  }
}

function generateSpot(ownerId) {
  const { city, state, lat, lng } = getRandomElement(locations);
  const description = getSpotDescription(city);
  const name = getSpotName(city);

  return {
    ownerId,
    address: `Generated Address for Owner ${ownerId}`,
    city,
    state,
    country: "United States of America",
    lat,
    lng,
    name,
    description,
    price: Math.floor(Math.random() * 500) + 100,
  };
}
module.exports = {
  async up(queryInterface, Sequelize) {
    const spots = [];
    for (let ownerId = 1; ownerId <= 7; ownerId++) {
      for (let i = 0; i < 4; i++) {
        spots.push(generateSpot(ownerId));
      }
    }

    await Spot.bulkCreate(spots, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkDelete(options, null, {});
  },
};
