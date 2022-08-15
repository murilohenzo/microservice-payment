import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_payment")
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: "48", unique: true })
  billet: string;

  @Column()
  amount: number;

  @Column({ type: 'date' })
  paymentDate: Date;

  @Column({ type: 'enum', default: "PENDENTE", enum: ['PENDENTE', 'FINALIZADO'] })
  status: string;

  @Column()
  cashback: number;
}