import { Bee } from '@database/postgres/entities/bee.entity';
import { IBeeRepository } from '@database/postgres/repositories/interface/bee-repository.interface';
import { Injectable } from '@nestjs/common';
import { ExistsBeeException } from 'core/exceptions/ExistsBeeException';
import { Input } from './input';

@Injectable()
export class CreateBee {
  constructor(
    private readonly repository: IBeeRepository
  ) { }

  async execute(input: Input): Promise<Bee> {

    const bee = await this.repository.findOne({ name: input.name });

    if (bee) {
      throw new ExistsBeeException();
    }

    const newBee = new Bee();
    newBee.name = input.name;

    return this.repository.save(newBee);
  }
}