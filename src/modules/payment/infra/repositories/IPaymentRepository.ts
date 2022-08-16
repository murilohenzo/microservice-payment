import { IPaymentDTO } from "modules/payment/domain/dto/IPaymentDTO";

export interface IPaymentRepository {
  save(payment: Omit<IPaymentDTO, "id" | "status" | "paymentDate">): Promise<IPaymentDTO>
  findAll(take: number, page: number, customer_id: string): Promise<IPaymentDTO[]>;
}