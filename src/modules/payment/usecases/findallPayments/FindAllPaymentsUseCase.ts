import "reflect-metadata"

import { IPaymentDTO } from "../../domain/dto/IPaymentDTO";
import { IPaymentRepository } from "../../infra/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";

import { DefaultError } from "../../../../shared/error/DefaultError";
import { ICustomerRepository } from "modules/customer/infra/repositories/ICustomerRepository";
import { StatusCodes } from "http-status-codes";

@injectable()
export class FindAllPaymentsUseCase {
  constructor(
    @inject("PaymentRepository")
    private readonly paymentRepository: IPaymentRepository,

  ) {}

  async execute(take: number, page: number, customer_id: string): Promise<IPaymentDTO[]> {
    const payments = await this.paymentRepository.findAll(take, page, customer_id);
    return payments;
  }
}