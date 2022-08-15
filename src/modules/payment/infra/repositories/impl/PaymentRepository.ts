import { IPaymentDTO } from "modules/payment/domain/dto/IPaymentDTO";
import { Payment } from "modules/payment/domain/entity/Payment";
import { getRepository, Repository } from "typeorm";
import { IPaymentRepository } from "../IPaymentRepository";

export class PaymentRepository implements IPaymentRepository {
  
  private paymentRepository: Repository<Payment>;

  constructor() {
    this.paymentRepository = getRepository(Payment);
  }

  async save(payment: IPaymentDTO): Promise<IPaymentDTO> {
    const newPayment = this.paymentRepository.create(payment);

    await this.paymentRepository.save(newPayment);

    return newPayment;
  }
  
}