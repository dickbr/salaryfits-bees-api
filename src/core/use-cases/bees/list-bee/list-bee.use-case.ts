import { Bee } from '@database/postgres/entities/bee.entity';
import { IBeeRepository } from '@database/postgres/repositories/interface/bee-repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListBee {
  constructor(private readonly repository: IBeeRepository) { }

  async execute(): Promise<{ list: Bee[]; count: number; }> {
    return this.repository.find().findMany();
  }
}