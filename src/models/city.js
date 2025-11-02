import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize.js";

export default class City extends Model {}
City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z ]*$/,
        notEmpty: true,
        len: [2, 100],
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z\s]*$/,
        len: [2, 100],
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z ]*$/,
        notEmpty: true,
        len: [2, 100],
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "City",
    tableName: "cities",
    indexes: [
      {
        unique: true,
        fields: ["name", "state", "country"],
        name: "uniqueCityStateCountry",
      },
    ],
  }
);
