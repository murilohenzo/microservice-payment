import { Router } from "express";

import { customerRoutes } from "../../modules/customer/routes/customerRouter";

const routes = Router();
routes.use("/customers", customerRoutes);

export { routes };