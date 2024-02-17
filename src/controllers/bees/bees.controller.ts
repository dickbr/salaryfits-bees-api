// src/controllers/bees/bees.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBee } from 'core/use-cases/bees/create-bee/create-bee.use-case';
import { GetBee } from 'core/use-cases/bees/get-bees/get-bee.use-case';
import { SendMessage } from 'core/use-cases/bees/send-message/send-message.use-case';
import { CreateBeeRequest } from 'dtos/bees/create-bee.request';
import { MessageRequest } from 'dtos/bees/message-request';

@Controller('bees')
export class BeeController {
  constructor(
    private readonly createBeeService: CreateBee,
    private readonly getBeesService: GetBee,
    private readonly sendMessageService: SendMessage
  ) { }

  @Post()
  async create(@Body() createBeeRequest: CreateBeeRequest) {
    return this.createBeeService.execute(createBeeRequest);
  }

  @Get()
  async findAll() {
    return this.getBeesService.execute();
  }

  @Post('messages')
  async sendMessage(@Body() messageRequest: MessageRequest) {
    return this.sendMessageService.execute(messageRequest);
  }
}