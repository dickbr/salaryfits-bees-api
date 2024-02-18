import { Bee } from '@database/postgres/entities/bee.entity';
import { IBeeRepository } from '@database/postgres/repositories/interface/bee-repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetBee {
  constructor(private readonly repository: IBeeRepository) { }

  async execute(): Promise<Bee[]> {
    return this.repository.findAll();
  }
}