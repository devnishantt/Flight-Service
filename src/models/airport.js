import { DataTypes, Model } from "sequelize";
import City from "./city.js";
import sequelize from "./sequelize.js";

export default class Airport extends Model {}
Airport.init(
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
        is: /^[a-zA-Z ]+$/,
        notEmpty: true,
        len: [2, 100],
      },
    },
    code: {
      type: DataTypes.STRING(3),
      allowNull: false,
      validate: {
        isUppercase: true,
        is: /^[A-Z]{3}$/,
        notEmpty: true,
      },
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: City,
        key: "id",
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 500],
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Airport",
    tableName: "airports",
    indexes: [{ unique: true, fields: ["code"] }],
  }
);

Airport.belongsTo(City, {
  foreignKey: "cityId",
  as: "city",
});
