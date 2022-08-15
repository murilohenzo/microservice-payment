import { Payment } from "modules/payment/domain/entity/Payment";
import { IPaymentDTO } from "modules/payment/domain/dto/IPaymentDTO";
import { IPaymentRepository } from "../IPaymentRepository";
import { v4 as uuidv4 } from 'uuid'

export class PaymentRepositoryInMemory implements IPaymentRepository {

  private payments: IPaymentDTO[] = [];

  async save(payment: IPaymentDTO): Promise<IPaymentDTO> {
    const newPayment = new Payment();

    Object.assign(newPayment, { id: uuidv4() }, payment);

    await this.payments.push(newPayment);

    return newPayment;
  }
}