/** @type {import('sequelize-cli').Migration} */

import { Op } from "sequelize";

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert("airplanes", [
    { modelNumber: "boeing777", capacity: 700 },
    { modelNumber: "airbus340", capacity: 500 },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("airplanes", {
    [Op.or]: [{ modelNumber: "boeing777" }, { modelNumber: "airbus340" }],
  });
}
