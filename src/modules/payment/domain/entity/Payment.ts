import { Customer } from "modules/customer/domain/entity/Customer";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity("tb_payment")
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: "48", unique: true })
  billet: string;

  @Column()
  amount: number;

  @Column({ name: "payment_date", type: 'date' })
  paymentDate: Date;

  @Column({ type: 'enum', default: "PENDENTE", enum: ['PENDENTE', 'FINALIZADO'] })
  status: string;

  @Column()
  cashback: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  customer: Customer
}