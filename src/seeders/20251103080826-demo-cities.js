"use strict";

import { Op } from "sequelize";

/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert("cities", [
    { name: "New York", state: "New York", country: "United States" },
    { name: "Mumbai", state: "Maharashtra", country: "India" },
    { name: "Delhi", state: "Delhi", country: "India" },
    { name: "Bangalore", state: "Karnataka", country: "India" },
    { name: "Kolkata", state: "West Bengal", country: "India" },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("cities", {
    [Op.or]: [
      { name: "New York", country: "United States" },
      { name: "Mumbai", country: "India" },
      { name: "Delhi", country: "India" },
      { name: "Bangalore", country: "India" },
      { name: "Kolkata", country: "India" },
    ],
  });
}
