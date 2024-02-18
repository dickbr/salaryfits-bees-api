import { IBeeRepository } from '@database/postgres/repositories/interface/bee-repository.interface';
import { Injectable } from '@nestjs/common';
import { SqsService } from 'sqs/sqs.service';
import { Input } from './input';

@Injectable()
export class SendMessage {
  constructor(
    private readonly sqsService: SqsService,
    private readonly reposiroy: IBeeRepository
  ) { }

  async execute(input: Input): Promise<void> {
    // Validação dos campos da mensagem
    if (!input.sender || typeof input.sender !== 'string') {
      throw new Error('Sender must be a string');
    }
    if (!input.receiver || typeof input.receiver !== 'string') {
      throw new Error('Receiver must be a string');
    }
    if (!input.content || typeof input.content !== 'string') {
      throw new Error('Content must be a string');
    }

    // Verificar se o remetente e o destinatário estão registrados
    const senderBee = await this.reposiroy.findOne({ name: input.sender });
    const receiverBee = await this.reposiroy.findOne({ name: input.receiver });

    if (!senderBee) {
      throw new Error('Sender not found');
    }
    if (!receiverBee) {
      throw new Error('Receiver not found');
    }

    // Utilizar o serviço de mensageria para enviar a mensagem
    await this.sqsService.sendMessage(
      'your-queue-url', // Replace with your actual queue URL
      JSON.stringify({
        sender: input.sender,
        receiver: input.receiver,
        content: input.content,
      })
    );
  }
}