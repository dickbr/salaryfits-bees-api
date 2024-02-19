import { Bee } from "@database/postgres/entities/bee.entity";
import { FakeBeeRepository } from "@database/postgres/repositories/fake/bee.repository.fake";
import { IBeeRepository } from "@database/postgres/repositories/interface/bee-repository.interface";
import { module_mock } from "app.module.mock";
import { ExistsBeeException } from "core/exceptions";
import { randomUUID } from "crypto";
import { CreateBee } from "./create-bee.use-case";
import { Input } from "./input";

describe('CreateClient', () => {
  let use_case: CreateBee;
  let repository: FakeBeeRepository;

  beforeEach(async () => {
    const moduleRef = await module_mock()
    use_case = moduleRef.get<CreateBee>(CreateBee);
    repository = moduleRef.get<IBeeRepository>(IBeeRepository) as FakeBeeRepository;
  })

  const input: Input = {
    name: 'some-name'
  }

  const bee: Partial<Bee> = {
    ...input,
    id: randomUUID(),
  }

  it.each([
    {
      should: 'save the bee successfuly',
      input,
      setup: () => {
        repository.save.mockResolvedValueOnce(bee)
      },
      expected: (result: any) => {
        expect(repository.save).toHaveBeenCalledWith(input),
          expect(result).toEqual(bee)
      }
    },
    {
      should: 'throw if name of bee already exists',
      input,
      setup: () => {
        repository.findOne.mockResolvedValueOnce(bee)
      },
      expected: (result: any) => {
        expect(result).toBeInstanceOf(ExistsBeeException)
      }
    },
  ])('Should $should', async ({ input, setup, expected }) => {
    if (setup) setup();

    await use_case.execute(input as unknown as Input).then(expected).catch(expected)
  })
})