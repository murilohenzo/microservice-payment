import { ICustomerDTO } from "../../../domain/dto/ICustomerDTO";
import { Customer } from "../../../domain/entity/Customer";
import { ICustomerRepository } from "../ICustomerRepository";
import { getRepository, Repository } from "typeorm";

export class CustomerRepository implements ICustomerRepository {

  private customerRepository: Repository<Customer>;

  constructor() {
    this.customerRepository = getRepository(Customer);
  }

  async save(customer: ICustomerDTO): Promise<ICustomerDTO> {
    const newCustomer = this.customerRepository.create(customer);

    await this.customerRepository.save(newCustomer);

    return newCustomer;
  }
  async findAll(take: number, page: number): Promise<ICustomerDTO[]> {
    const customers = await this.customerRepository.query(
    `
      select d.id, d.name, d.sex, d.age, d.hobby, d.birth_date, d.level_id, l.level 
      from developers d 
      inner join levels l 
      on d.level_id = l.id 
      order by d.id
      offset ${(page - 1) * take} rows fetch next ${take} rows only
    `)

    return customers;
  }
  async findById(id: string): Promise<ICustomerDTO> {
    const customer = await this.customerRepository.findOne(id);
    if (customer) return customer;
    throw new Error("Not found customer")
  }
  async update(id: string, customer: Omit<ICustomerDTO, "id">): Promise<ICustomerDTO> {
    const existsCustomer = await this.findById(id);

    existsCustomer.name = customer.name || existsCustomer.name;
    existsCustomer.age = customer.age || existsCustomer.age;
    existsCustomer.cpf = customer.cpf || existsCustomer.cpf;
    existsCustomer.balance = customer.balance || existsCustomer.balance;

    return await this.customerRepository.save(existsCustomer);
  }
  async delete(id: string): Promise<void> {
    await this.customerRepository.delete(id);
  }
}