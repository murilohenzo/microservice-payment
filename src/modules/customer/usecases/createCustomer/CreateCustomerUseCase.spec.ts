import { ICustomerDTO } from "../../domain/dto/ICustomerDTO";
import { DefaultError } from "../../../../shared/error/DefaultError";
import { ICustomerRepository } from "../../infra/repositories/ICustomerRepository";
import { CustomerRepositoryInMemory } from "../../infra/repositories/impl/CustomerRepositoryInMemory";
import { CreateCustomerUseCase } from "./CreateCustomerUsecase";

let customerRepositoryInMemory: ICustomerRepository;

describe("CreateCustomerUseCase", () => {
  beforeAll(() => {
    customerRepositoryInMemory = new CustomerRepositoryInMemory();
  })

  it("should be able to create new customer", async () => {
    const service = new CreateCustomerUseCase(customerRepositoryInMemory);

    const customer = await service.execute({
      name: "John Doe",
      age: 22,
      cpf: '12345678901',
      balance: 100.00
    });

    expect(customer).toHaveProperty("name");
    expect(customer.age).toEqual(22);
  })

  it("shouldn't be able to create new customer with empty fields", async () => {
    const service = new CreateCustomerUseCase(customerRepositoryInMemory);

    expect.assertions(1);
    try {
      await service.execute({} as ICustomerDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(DefaultError);
    }
  })
})