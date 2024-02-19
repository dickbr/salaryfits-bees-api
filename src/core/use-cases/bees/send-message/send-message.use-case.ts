import { IBeeRepository } from '@database/postgres/repositories/interface/bee-repository.interface';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { NotFoundException } from 'core/exceptions';
import { SqsService } from 'sqs/sqs.service';
import { Input } from './input';

@Injectable()
export class SendMessage {
  constructor(
    private readonly sqsService: SqsService,
    private readonly reposiroy: IBeeRepository
  ) { }

  async execute(input: Input): Promise<void> {
    await validateOrReject(plainToInstance(Input, input));

    const senderBee = await this.reposiroy.find({ name: input.sender }).findOne();
    const receiverBee = await this.reposiroy.find({ name: input.receiver }).findOne();

    if (!senderBee || !receiverBee) {
      throw new NotFoundException();
    }

    await this.sqsService.sendMessage(
      JSON.stringify({
        sender: senderBee.id,
        receiver: receiverBee.id,
        content: input.content,
      })
    );
  }
}