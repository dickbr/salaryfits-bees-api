import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SqsService {
  private readonly queue = process.env.AWS_QUEUE
  private readonly sqs = new SQSClient({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_REGION
  })

  async sendMessage(messageBody: string): Promise<void> {
    const comand = new SendMessageCommand({
      MessageBody: messageBody,
      QueueUrl: this.queue,
    })

    await this.sqs.send(comand);
  }
}