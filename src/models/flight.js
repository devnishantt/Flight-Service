import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize.js";

export default class Flight extends Model {
  static associate(models) {
    if (models.Airplane) {
      Flight.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        as: "airplane",
      });
    }
    if (models.Airport) {
      Flight.belongsTo(models.Airport, {
        foreignKey: "departureAirportId",
        as: "departureAirport",
      });
      Flight.belongsTo(models.Airport, {
        foreignKey: "arrivalAirportId",
        as: "arrivalAirport",
      });
    }
  }
}

Flight.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "airplanes",
        key: "id",
      },
    },
    departureAirportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "airports",
        key: "id",
      },
    },
    arrivalAirportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "airports",
        key: "id",
      },
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    boardingGate: {
      type: DataTypes.STRING(10),
      allowNull: true,
      validate: { len: [0, 10] },
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 0,
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Flight",
    tableName: "flights",
    indexes: [
      { fields: ["airplaneId"] },
      { fields: ["departureAirportId"] },
      { fields: ["arrivalAirportId"] },
      { fields: ["departureTime"] },
    ],
  }
);
