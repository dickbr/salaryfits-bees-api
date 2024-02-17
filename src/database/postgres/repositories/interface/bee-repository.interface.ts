import { Bee } from "@database/postgres/entities/bee.entity";

export abstract class IBeeRepository {
  abstract save(entity: Bee): Promise<Bee>;
  abstract find(entity?: Partial<Bee>): this;
  abstract byName(input: { name?: string }): this;
  abstract paginate(page?: number, per_page?: number): this;
  abstract findOne(condition: Partial<Bee>): Promise<Bee | null>;
  abstract findMany(): Promise<{ list: Bee[]; count: number }>;
  abstract delete(entity: Bee): Promise<void>;
  abstract printSql(): this;
}