import { Router } from "express";
import airplaneRouter from "./airplaneRoutes.js";

const v1Router = Router();

v1Router.use("/airplane", airplaneRouter);

export default v1Router;
