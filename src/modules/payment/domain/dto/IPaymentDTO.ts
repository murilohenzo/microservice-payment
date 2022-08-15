import { Customer } from "modules/customer/domain/entity/Customer";

export class IPaymentDTO {
  id: string;
  billet: string;
  amount: number;
  paymentDate: Date;
  status: string;
  cashback: number;
  customer: Customer
}