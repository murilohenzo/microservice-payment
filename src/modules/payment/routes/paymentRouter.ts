import { Request, Response, Router } from "express";
import { PaymentController } from "../controllers";

const paymentRoutes = Router();
const paymentController = new PaymentController();

paymentRoutes.post("", (request: Request, response: Response) => {
  return paymentController.create(request, response);
});

export { paymentRoutes };