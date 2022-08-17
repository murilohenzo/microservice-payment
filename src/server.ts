import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

import express from "express";

import "./config/database";
import "./shared/container";
import morganMiddlewareLogger from "./middlewares/morganMiddlewareLogger";
import { routes } from "./modules/routes";

const app = express();
app.use(express.json());
app.use(morganMiddlewareLogger);
app.use(routes);

app.listen(3333, () => {
  console.log("🚀️ Server started on port 3333!");
});
