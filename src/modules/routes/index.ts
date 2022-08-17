import { Router } from "express";

import { customerRoutes } from "../../modules/customer/routes/customerRouter";
import { paymentRoutes } from "../../modules/payment/routes/paymentRouter";

const routes = Router();
routes.use("/customers", customerRoutes);
routes.use("/payments", paymentRoutes);

export { routes };