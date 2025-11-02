import { Router } from "express";
import airplaneRouter from "./airplaneRoutes.js";
import cityRouter from "./cityRoutes.js";

const v1Router = Router();

v1Router.use("/airplane", airplaneRouter);
v1Router.use("/city", cityRouter);

export default v1Router;
