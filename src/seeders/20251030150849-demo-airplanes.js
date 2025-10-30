/** @type {import('sequelize-cli').Migration} */

import { Op } from "sequelize";

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert("airplanes", [
    { modelNumber: "boeing777", capacity: 700 },
    { modelNumber: "airbus340", capacity: 500 },
  ]);
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
   */
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("airplanes", {
    [Op.or]: [{ modelNumber: "boeing777" }, { modelNumber: "airbus340" }],
  });
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
