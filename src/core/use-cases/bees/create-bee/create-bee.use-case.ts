import { Bee } from '@database/postgres/entities/bee.entity';
import { BeeRepository } from '@database/postgres/repositories/implementation/bee.repository';
import { Injectable } from '@nestjs/common';
import { Input } from './input';

@Injectable()
export class CreateBee {
  constructor(
    private readonly beesRepository: BeeRepository
  ) { }

  async execute(input: Input): Promise<Bee> {
    const existingBee = await this.beesRepository.findOne({ name: input.name });
    if (existingBee) {
      throw new Error('Uma abelha com esse nome já existe.');
    }

    const newBee = new Bee();
    newBee.name = input.name;

    return this.beesRepository.save(newBee);
  }
}