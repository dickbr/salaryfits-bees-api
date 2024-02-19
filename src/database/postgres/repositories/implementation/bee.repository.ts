// src/database/postgres/repositories/implementation/bee.repository.ts
import { Bee } from "@database/postgres/entities/bee.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { IBeeRepository } from "../interface/bee-repository.interface";

@Injectable()
export class BeeRepository implements IBeeRepository {
  constructor(
    @InjectRepository(Bee) private readonly repository: Repository<Bee>
  ) { }

  private query: SelectQueryBuilder<Bee> = null as unknown as SelectQueryBuilder<Bee>;

  async save(entity: Bee): Promise<Bee> {
    return await this.repository.save(entity);
  }

  find(entity?: Partial<Bee>): this {
    this.query = this.repository.createQueryBuilder('bee');
    if (entity) {
      this.query.where(entity);
    }
    return this;
  }

  byName(input: { name?: string }): this {
    if (input.name) {
      this.query?.andWhere('bee.name ILIKE :name', { name: `%${input.name}%` });
    }
    return this;
  }

  paginate(page?: number, per_page?: number): this {
    if (page) {
      this.query?.offset(page * (per_page ?? 0));
    }
    if (per_page) {
      this.query?.limit(per_page);
    }
    return this;
  }

  async findOne(): Promise<Bee | null> {
    return await this.query.getOne();
  }

  async findMany(): Promise<{ list: Bee[]; count: number }> {
    const [list, count] = await this.query?.getManyAndCount() as [Bee[], number];
    return { list, count };
  }

  async delete(entity: Bee): Promise<void> {
    await this.repository.delete(entity.id as string);
  }

  printSql(): this {
    console.log({
      query: this.query?.getSql(),
      params: this.query?.getParameters(),
    });
    return this;
  }
}