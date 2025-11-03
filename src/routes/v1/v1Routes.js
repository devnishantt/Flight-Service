import { Router } from "express";
import airplaneRouter from "./airplaneRoutes.js";
import cityRouter from "./cityRoutes.js";
import airportRouter from "./airportRoutes.js";

const v1Router = Router();

v1Router.use("/airplane", airplaneRouter);
v1Router.use("/city", cityRouter);
v1Router.use("/airport", airportRouter);

export default v1Router;
