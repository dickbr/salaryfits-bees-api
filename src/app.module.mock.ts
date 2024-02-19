import { FakeBeeRepository } from '@database/postgres/repositories/fake/bee.repository.fake';
import { IBeeRepository } from '@database/postgres/repositories/interface/bee-repository.interface';
import { Test } from '@nestjs/testing';
import { CreateBee } from 'core/use-cases/bees/create-bee/create-bee.use-case';
import { ListBee } from 'core/use-cases/bees/list-bee/list-bee.use-case';
import { SendMessage } from 'core/use-cases/bees/send-message/send-message.use-case';
import { SqsService } from 'sqs/sqs.service';

export const module_mock = async () => {
  return await Test.createTestingModule({
    providers: [
      {
        provide: IBeeRepository,
        useClass: FakeBeeRepository
      },
      CreateBee,
      ListBee,
      SendMessage,
      SqsService
    ],
  }).compile()
}