import { IPaymentDTO } from "modules/payment/domain/dto/IPaymentDTO";

export interface IPaymentRepository {
  save(payment: IPaymentDTO): Promise<IPaymentDTO>
}