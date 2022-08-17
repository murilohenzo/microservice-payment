import { IPaymentDTO } from "../../domain/dto/IPaymentDTO";
import { DefaultError } from "../../../../shared/error/DefaultError";
import { PaymentRepositoryInMemory } from "../../infra/repositories/impl/PaymentRepositoryInMemory";
import { CreatePaymentUseCase } from "./CreatePaymentUseCase";

let paymentRepositoryInMemory: PaymentRepositoryInMemory;

describe("CreatePaymentUseCase", () => {
  beforeAll(() => {
    paymentRepositoryInMemory = new PaymentRepositoryInMemory();
  })

  it("should be able to create new customer", async () => {
    const service = new CreatePaymentUseCase(paymentRepositoryInMemory);

    const customer = await service.execute({
      billet: "826500000011323116990009002022153320476101001040",
      amount: 100,
      cashback: 10,
      customer_id: "17bec015-988e-4353-a9cd-c88241c99dfb"
    });

    expect(customer).toHaveProperty("billet");
    expect(customer.billet).toEqual("826500000011323116990009002022153320476101001040");
  })

  it("shouldn't be able to create new customer with empty fields", async () => {
    const service = new CreatePaymentUseCase(paymentRepositoryInMemory);

    expect.assertions(1);
    try {
      await service.execute({} as IPaymentDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(DefaultError);
    }
  })
})