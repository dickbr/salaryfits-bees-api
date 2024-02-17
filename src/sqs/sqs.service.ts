import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class SqsService {
  private sqs: AWS.SQS;

  constructor() {
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    this.sqs = new AWS.SQS();
  }

  async sendMessage(queueUrl: string, messageBody: string): Promise<void> {
    const params = {
      MessageBody: messageBody,
      QueueUrl: queueUrl,
    };

    await this.sqs.sendMessage(params).promise();
  }

  async receiveMessage(queueUrl: string): Promise<AWS.SQS.ReceiveMessageResult> {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 1,
    };

    return await this.sqs.receiveMessage(params).promise();
  }
}