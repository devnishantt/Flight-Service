import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize.js";

export default class Airplane extends Model {}
Airplane.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    modelNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z0-9 ]*$/,
        notEmpty: true,
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: true,
        min: 1,
        max: 1000,
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Airplane",
    tableName: "airplanes",
  }
);
