/** @type {import('sequelize-cli').Migration} */

import { Op } from "sequelize";

export async function up(queryInterface, Sequelize) {
  const cities = await queryInterface.sequelize.query(
    'SELECT id, name FROM cities WHERE name IN ("Mumbai", "Delhi", "New York")',
    { type: Sequelize.QueryTypes.SELECT }
  );

  // Create a map of city name to ID
  const cityMap = {};
  cities.forEach((city) => {
    cityMap[city.name] = city.id;
  });

  await queryInterface.bulkInsert("airports", [
    {
      name: "Chhatrapati Shivaji Maharaj International Airport",
      code: "BOM",
      cityId: cityMap["Mumbai"],
      address: "Mumbai, Maharashtra, India",
    },
    {
      name: "Indira Gandhi International Airport",
      code: "DEL",
      cityId: cityMap["Delhi"],
      address: "New Delhi, Delhi, India",
    },
    {
      name: "John F. Kennedy International Airport",
      code: "JFK",
      cityId: cityMap["New York"],
      address: "Queens, New York, USA",
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("airports", {
    [Op.or]: [{ code: "BOM" }, { code: "DEL" }, { code: "JFK" }],
  });
}
