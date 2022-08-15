import { Request, Response, Router } from "express";
import { CustomerController } from "../controllers";

const customerRoutes = Router();
const customerController = new CustomerController();

customerRoutes.post("", (request: Request, response: Response) => {
  return customerController.create(request, response);
});

export { customerRoutes };