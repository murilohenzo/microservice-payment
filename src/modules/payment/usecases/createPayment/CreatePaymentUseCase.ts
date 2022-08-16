import "reflect-metadata"

import { IPaymentDTO } from "../../domain/dto/IPaymentDTO";
import { IPaymentRepository } from "../../infra/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";

import { DefaultError } from "../../../../shared/error/DefaultError";
import { ICustomerRepository } from "modules/customer/infra/repositories/ICustomerRepository";
import { StatusCodes } from "http-status-codes";

@injectable()
export class CreatePaymentUseCase {
  constructor(
    @inject("PaymentRepository")
    private readonly paymentRepository: IPaymentRepository,
    @inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository

  ) {}

  async execute(payment: Omit<IPaymentDTO, "id" | "status" | "paymentDate">): Promise<IPaymentDTO> {
    if (
      payment.billet &&
      payment.amount &&
      payment.cashback &&
      payment.customer_id
    ) {

      const existsCustomer = await this.customerRepository.findById(payment.customer_id);

      if (existsCustomer)  return this.paymentRepository.save(payment);

    }

    throw new DefaultError(`Campos ${Object.keys(payment)} obrigatorios`);
  }
}