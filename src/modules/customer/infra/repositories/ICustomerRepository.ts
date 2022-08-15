import { ICustomerDTO } from "modules/customer/domain/dto/ICustomerDTO";

export interface ICustomerRepository {
  save(customer: ICustomerDTO): Promise<ICustomerDTO>
  findAll(take: number, page: number): Promise<ICustomerDTO[]>;
  findById(id: string): Promise<ICustomerDTO>;
  update(
    id: string,
    customer: Omit<ICustomerDTO, "id">
  ): Promise<ICustomerDTO>;
  delete(id: string): Promise<void>;
}