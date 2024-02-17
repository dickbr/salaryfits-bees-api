import { Bee } from '@database/postgres/entities/bee.entity';
import { BeeRepository } from '@database/postgres/repositories/implementation/bee.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetBee {
  constructor(private readonly beeRepository: BeeRepository) { }

  async execute(): Promise<Bee[]> {
    return this.beeRepository.findAll();
  }
}