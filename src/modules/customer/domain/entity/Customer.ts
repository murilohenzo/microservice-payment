import { Payment } from "../../../payment/domain/entity/Payment";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";

@Entity("tb_customer")
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: "100", unique: false })
  name: string;

  @Column()
  age: number;

  @Column({ length: "11", unique: true })
  cpf: string;

  @Column()
  balance: number;

  @OneToMany(() => Payment, (payment) => payment.customer)
  payments: Payment[];
}