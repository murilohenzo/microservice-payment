import { ICustomerDTO } from "../../domain/dto/ICustomerDTO";
import { ICustomerRepository } from "../../infra/repositories/ICustomerRepository";
import { inject, injectable } from "tsyringe";

import { DefaultError } from "../../../../shared/error/DefaultError";

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject("CustomerRepository")
    private readonly repository: ICustomerRepository
  ) {}

  async execute(customer: Omit<ICustomerDTO, "id">): Promise<ICustomerDTO> {
    if (
      customer.age &&
      customer.cpf &&
      customer.name
    ) return this.repository.save(customer);

    throw new DefaultError("Campos de nome, cpf e idade obrigatorios");
  }
}