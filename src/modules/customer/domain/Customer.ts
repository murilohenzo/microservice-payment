import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_customer")
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: "100", unique: false })
  name: string;

  @Column({ type: "int64" })
  age: number;

  @Column({ length: "11", unique: true })
  cpf: string;

  @Column()
  balance: number;
}