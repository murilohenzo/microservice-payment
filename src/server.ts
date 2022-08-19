import "reflect-metadata";
import "./shared/container";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morganMiddlewareLogger from "./middlewares/morganMiddlewareLogger";
import { routes } from "./modules/routes";


import { getDBConnection } from "./config/database";
import Logger from "./lib/logger";

(async () => {
  try {
    await getDBConnection();
  } catch (error) {
    Logger.error(error);
  }

  const app = express();
  app.use(express.json());
  app.use(morganMiddlewareLogger);
  app.use(routes);

  app.listen(3333, () => {
    console.log("🚀️ Server started on port 3333!");
  });
})();

