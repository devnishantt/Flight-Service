import Airplane from "./airplane.js";
import City from "./city.js";
import Airport from "./airport.js";

const models = { Airplane, City, Airport };

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { Airplane, City, Airport };
