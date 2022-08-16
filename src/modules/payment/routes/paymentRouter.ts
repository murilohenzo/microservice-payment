import { Request, Response, Router } from "express";
import { PaymentController } from "../controllers";

const paymentRoutes = Router();
const paymentController = new PaymentController();

paymentRoutes.post("", (request: Request, response: Response) => {
  return paymentController.create(request, response);
});

paymentRoutes.get("", (request: Request, response: Response) => {
  return paymentController.findAll(request, response);
});

export { paymentRoutes };