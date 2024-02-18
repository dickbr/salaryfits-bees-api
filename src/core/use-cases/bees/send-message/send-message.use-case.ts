import { IBeeRepository } from '@database/postgres/repositories/interface/bee-repository.interface';
import { Injectable } from '@nestjs/common';
import { NotFoundReceiverException } from 'core/exceptions/NotFoundReceiverException';
import { NotFoundSeenderException } from 'core/exceptions/NotFoundSeenderException';
import { SqsService } from 'sqs/sqs.service';
import { Input } from './input';

@Injectable()
export class SendMessage {
  constructor(
    private readonly sqsService: SqsService,
    private readonly reposiroy: IBeeRepository
  ) { }

  async execute(input: Input): Promise<void> {

    const senderBee = await this.reposiroy.findOne({ name: input.sender });
    const receiverBee = await this.reposiroy.findOne({ name: input.receiver });

    if (!senderBee) {
      throw new NotFoundSeenderException();
    }
    if (!receiverBee) {
      throw new NotFoundReceiverException();
    }

    await this.sqsService.sendMessage(
      'your-queue-url',
      JSON.stringify({
        sender: input.sender,
        receiver: input.receiver,
        content: input.content,
      })
    );
  }
}