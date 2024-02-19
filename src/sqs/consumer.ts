import { SQSClient } from "@aws-sdk/client-sqs"
import { dataSource } from "@database/postgres/datasource"
import { Bee } from "@database/postgres/entities/bee.entity"
import { BeeRepository } from "@database/postgres/repositories/implementation/bee.repository"
import { ReceiverMessage } from "core/use-cases/bees/receiver-message/receiver-message.use-case"
import { Consumer } from "sqs-consumer"

export class BeeConsumer {
  constructor() {
    dataSource.initialize()
  }
  private readonly receiverMessage = new ReceiverMessage(new BeeRepository(dataSource.getRepository(Bee)))
  private readonly queue = process.env.AWS_QUEUE
  private readonly sqs = new SQSClient({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_REGION
  })

  init() {
    const consumer = Consumer.create({
      sqs: this.sqs,
      queueUrl: this.queue as string,
      handleMessage: async (message) => {
        await this.receiverMessage.execute(JSON.parse(message.Body as string))
      }
    })
    consumer.start()
    console.log("consumer is running")
  }
}

new BeeConsumer().init()