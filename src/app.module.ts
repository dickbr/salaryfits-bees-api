import { Bee } from '@database/postgres/entities/bee.entity';
import { BeeRepository } from '@database/postgres/repositories/implementation/bee.repository';
import { IBeeRepository } from '@database/postgres/repositories/interface/bee-repository.interface';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeeController } from 'controllers/bees/bees.controller';
import { CreateBee } from 'core/use-cases/bees/create-bee/create-bee.use-case';
import { GetBee } from 'core/use-cases/bees/get-bees/get-bee.use-case';
import { SendMessage } from 'core/use-cases/bees/send-message/send-message.use-case';
import 'dotenv/config';
import { SqsModule } from 'sqs/sqs.module';
import { SqsService } from 'sqs/sqs.service';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ''),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: process.env.DB_SCHEMA,
    entities: [Bee],
    synchronize: false,
  }),
  TypeOrmModule.forFeature([
    Bee,
  ]),
    SqsModule
  ],
  controllers: [
    BeeController
  ],
  providers: [
    CreateBee,
    GetBee,
    SendMessage,
    SqsService,
    {
      provide: IBeeRepository,
      useClass: BeeRepository
    }
  ],
})
export class AppModule { }
