import { Bee } from '@database/postgres/entities/bee.entity';
import { IBeeRepository } from '@database/postgres/repositories/interface/bee-repository.interface';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ExistsBeeException } from 'core/exceptions';
import { Input } from './input';
@Injectable()
export class CreateBee {
  constructor(
    private readonly repository: IBeeRepository
  ) { }

  async execute(input: Input): Promise<Bee> {
    await validateOrReject(plainToInstance(Input, input));

    const bee = await this.repository.find({ name: input.name }).findOne();
    if (bee) {
      throw new ExistsBeeException()
    }
    return await this.repository.save(input);
  }
}