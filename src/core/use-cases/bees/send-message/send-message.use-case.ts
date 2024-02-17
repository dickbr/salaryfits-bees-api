import { Injectable } from '@nestjs/common';
import { SqsService } from 'sqs/sqs.service';
import { Input } from './input';

@Injectable()
export class SendMessage {
  constructor(private readonly sqsService: SqsService) { }

  async execute(input: Input): Promise<void> {
    // Implemente a lógica para enviar uma mensagem
  }
}