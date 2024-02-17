import "dotenv/config";
import { resolve } from "path";
import { DataSource } from "typeorm";
import { Bee } from "./entities/bee.entity";

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  entities: [Bee],
  synchronize: false,
  migrations: [resolve(__dirname, "migrations", "*{.ts,.js}")],
  uuidExtension: "uuid-ossp"
})