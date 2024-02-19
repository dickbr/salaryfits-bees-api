import { IBeeRepository } from '@database/postgres/repositories/interface/bee-repository.interface';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'core/exceptions';
import { Input } from './input';

@Injectable()
export class ReceiverMessage {
  constructor(
    private readonly reposiroy: IBeeRepository
  ) { }

  async execute(input: Input): Promise<void> {
    const [senderBee, receiverBee] = await Promise.all([
      this.reposiroy.find({ id: input.sender }).findOne(),
      this.reposiroy.find({ id: input.receiver }).findOne()
    ])

    if (!senderBee || !receiverBee) {
      throw new NotFoundException();
    }
    console.log(input.content);
  }
}