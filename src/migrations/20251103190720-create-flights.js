/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("flights", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    airplaneId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "airplanes",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    departureAirportId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "airports",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    arrivalAirportId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "airports",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    departureTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    arrivalTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    boardingGate: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },
    totalSeats: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    availableSeats: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  await queryInterface.addIndex("flights", ["airplaneId"]);
  await queryInterface.addIndex("flights", ["departureAirportId"]);
  await queryInterface.addIndex("flights", ["arrivalAirportId"]);
  await queryInterface.addIndex("flights", ["departureTime"]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("flights");
}
