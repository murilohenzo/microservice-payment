import "reflect-metadata"

import { IPaymentDTO } from "../../domain/dto/IPaymentDTO";
import { IPaymentRepository } from "../../infra/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";

import { DefaultError } from "../../../../shared/error/DefaultError";
import { ICustomerRepository } from "../../../customer/infra/repositories/ICustomerRepository";

import AWS from "aws-sdk";
import { getCrossAccountCredentials } from "../../../../config/aws/iam";
import Logger from "../../../../lib/logger";
import { StatusCodes } from "http-status-codes";
@injectable()
export class CreatePaymentUseCase {
  constructor(
    @inject("PaymentRepository")
    private readonly paymentRepository: IPaymentRepository,
    @inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository

  ) {}

  async execute(payment: Omit<IPaymentDTO, "id" | "status" | "paymentDate">): Promise<String> {
    if (
      payment.billet &&
      payment.amount &&
      payment.cashback &&
      payment.customer_id
    ) {

      const existsCustomer = await this.customerRepository.findById(payment.customer_id);

      if (!existsCustomer) throw new DefaultError("Nao existe cliente na base", StatusCodes.NOT_FOUND);

      const existsBillet = await this.paymentRepository.findByBillet(payment.billet);

      if (existsBillet && existsBillet.billet) throw new DefaultError("Boleto ja foi processado");

      if (existsCustomer.balance > 0 && existsCustomer.balance >= payment.amount) {
        AWS.config.update({ region: process.env.AWS_REGION_SQS });

        const accessParams = await getCrossAccountCredentials();
        //@ts-ignore
        const sqs = new AWS.SQS(accessParams); 

        let orderData = {
          'name': existsCustomer.name,
          'email': existsCustomer.email,
          'billet': payment.billet,
          'amount': payment.amount
      }

        let sqsOrderData: AWS.SQS.SendMessageRequest = {
          MessageAttributes: {
            "name": {
              DataType: "String",
              StringValue: orderData.name
            },
            "email": {
              DataType: "String",
              StringValue: orderData.email
            },
            "billet": {
              DataType: "String",
              StringValue: orderData.billet
            },
            "amount": {
              DataType: "String",
              StringValue: orderData.amount.toString()
            }
          },
          MessageBody: JSON.stringify(orderData),
          //@ts-ignore
          QueueUrl: process.env.AWS_SQS_URL
      };

        // Send the order data to the SQS queue
        let sendSqsMessage = sqs.sendMessage(sqsOrderData).promise();

        sendSqsMessage.then((data) => {
          Logger.info(`Service: Payment Service, Action: Successful action, message: ${data.MessageId} `)
           this.paymentRepository.save(payment);
          }).catch((err) => {
            Logger.error(`Service: Payment Service, Action: Error, message: ${err}`)
            return new DefaultError(`${err.message}`);
          });
          return "Boleto processado, aguarde o email sobre a finalizacao do pagamento";
      } else {
        throw new DefaultError(`Saldo insuficiente: ${existsCustomer.balance} para pagar boleto de ${payment.amount}`);
      }
    }

    throw new DefaultError(`Campos ${Object.keys(payment)} obrigatorios`);
  } 
}