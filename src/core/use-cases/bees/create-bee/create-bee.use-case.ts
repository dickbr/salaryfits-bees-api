import { Bee } from '@database/postgres/entities/bee.entity';
import { IBeeRepository } from '@database/postgres/repositories/interface/bee-repository.interface';
import { Injectable } from '@nestjs/common';
import { ExistsBeeException } from 'core/exceptions';
import { QueryFailedError } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Input } from './input';
@Injectable()
export class CreateBee {
  constructor(
    private readonly repository: IBeeRepository
  ) { }

  async execute(input: Input): Promise<Bee> {
    try {
      const newBee = new Bee();
      newBee.name = input.name;
      newBee.id = uuidv4();

      return await this.repository.save(newBee);
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('unique constraint')) {
        throw new ExistsBeeException();
      }
      throw error;
    }
  }
}