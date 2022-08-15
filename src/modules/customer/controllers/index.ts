import { Request, Response } from "express";
import { container } from "tsyringe";
import { StatusCodes } from "http-status-codes";
import { ICustomerDTO } from "../domain/dto/ICustomerDTO";
import { CreateCustomerUseCase } from "../usecases/createCustomer/CreateCustomerUsecase";

export class CustomerController {
  async create(
    request: Request,
    response: Response
    ): Promise<Response | undefined> {

      try {
        const customerDTO: ICustomerDTO = request.body;
        const service = container.resolve(CreateCustomerUseCase);
        const customer = await service.execute(customerDTO);

        return response.status(StatusCodes.CREATED).json(customer);
      } catch (error: any) {
        return response.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
      }
    }
}