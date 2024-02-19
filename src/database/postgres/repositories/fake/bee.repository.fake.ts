import { IBeeRepository } from "../interface/bee-repository.interface";

export class FakeBeeRepository implements IBeeRepository {
  find = () => this;
  withBlacklist = () => this;
  byTerm = () => this;
  paginate = () => this;
  byName = () => this;
  printSql = () => this;
  save = jest.fn();
  findOne = jest.fn();
  findMany = jest.fn();
  delete = jest.fn();
}