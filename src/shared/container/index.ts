import { container } from "tsyringe";

import { ICustomerRepository } from "../../modules/customer/infra/repositories/ICustomerRepository";
import { CustomerRepository } from "../../modules/customer/infra/repositories/impl/CustomerRepository";
import { PaymentRepository } from "../../modules/payment/infra/repositories/impl/PaymentRepository";
import { IPaymentRepository } from "../../modules/payment/infra/repositories/IPaymentRepository";

container.registerSingleton<ICustomerRepository>(
  "CustomerRepository",
  CustomerRepository
);

container.registerSingleton<IPaymentRepository>(
  "PaymentRepository",
  PaymentRepository
);