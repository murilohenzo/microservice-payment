import "reflect-metadata"

import { IPaymentDTO } from "../../domain/dto/IPaymentDTO";
import { IPaymentRepository } from "../../infra/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";

import { DefaultError } from "../../../../shared/error/DefaultError";

@injectable()
export class CreatePaymentUseCase {
  constructor(
    @inject("PaymentRepository")
    private readonly repository: IPaymentRepository
  ) {}

  async execute(payment: Omit<IPaymentDTO, "id" | "status" | "paymentDate">): Promise<IPaymentDTO> {
    if (
      payment.billet &&
      payment.amount &&
      payment.cashback &&
      payment.customer_id
    ) return this.repository.save(payment);

    throw new DefaultError(`Campos ${Object.keys(payment)} obrigatorios`);
  }
}