// src/controllers/bees/bees.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBee } from 'core/use-cases/bees/create-bee/create-bee.use-case';
import { ListBee } from 'core/use-cases/bees/list-bee/list-bee.use-case';
import { SendMessage } from 'core/use-cases/bees/send-message/send-message.use-case';
import { CreateBeeRequest } from 'dtos/bees/create-bee.request';
import { MessageRequest } from 'dtos/bees/message-request';

@Controller('bees')
export class BeeController {
  constructor(
    private readonly createBeeService: CreateBee,
    private readonly listBeesService: ListBee,
    private readonly sendMessageService: SendMessage
  ) { }

  @Post()
  async create(@Body() createBeeRequest: CreateBeeRequest) {
    return this.createBeeService.execute(createBeeRequest);
  }

  @Get()
  async findAll() {
    return this.listBeesService.execute();
  }

  @Post('messages')
  async sendMessage(@Body() messageRequest: MessageRequest) {
    return this.sendMessageService.execute(messageRequest);
  }
}