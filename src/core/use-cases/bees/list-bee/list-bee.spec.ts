import { Bee } from "@database/postgres/entities/bee.entity";
import { FakeBeeRepository } from "@database/postgres/repositories/fake/bee.repository.fake";
import { IBeeRepository } from "@database/postgres/repositories/interface/bee-repository.interface";
import { module_mock } from "app.module.mock";
import { randomUUID } from "crypto";
import { ListBee } from "./list-bee.use-case";

describe('ListBee', () => {
  let use_case: ListBee;
  let repository: FakeBeeRepository;

  beforeEach(async () => {
    const moduleRef = await module_mock()
    use_case = moduleRef.get<ListBee>(ListBee);
    repository = moduleRef.get<IBeeRepository>(IBeeRepository) as FakeBeeRepository;
  })

  const bee: Partial<Bee> = {
    id: randomUUID(),
    name: 'some-name'
  }

  it.each([
    {
      should: 'list names from Bee successfuly',
      input: {},
      setup: () => {
        repository.findMany.mockResolvedValueOnce({ list: [bee], count: 1 })
      },
      expected: (result: any) => {
        expect(result).toEqual({ list: [bee], count: 1 });
      }
    },
  ])('Should $should', async ({ setup, expected }) => {
    if (setup) setup();

    await use_case.execute().then(expected).catch(expected)
  })
})