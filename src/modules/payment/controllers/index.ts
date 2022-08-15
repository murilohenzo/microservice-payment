import { Request, Response } from "express";
import { container } from "tsyringe";
import { StatusCodes } from "http-status-codes";
import { IPaymentDTO } from "../domain/dto/IPaymentDTO";
import { CreatePaymentUseCase } from "../usecases/createPayment/CreatePaymentUseCase";

export class PaymentController {
  async create(
    request: Request,
    response: Response
    ): Promise<Response | undefined> {

      try {
        const paymentDTO: IPaymentDTO = request.body;
        const service = container.resolve(CreatePaymentUseCase);
        const payment = await service.execute(paymentDTO);

        return response.status(StatusCodes.CREATED).json(payment);
      } catch (error: any) {
        return response.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
      }
    }
}