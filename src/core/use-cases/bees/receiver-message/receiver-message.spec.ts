import { Bee } from "@database/postgres/entities/bee.entity";
import { FakeBeeRepository } from "@database/postgres/repositories/fake/bee.repository.fake";
import { IBeeRepository } from "@database/postgres/repositories/interface/bee-repository.interface";
import { Test } from "@nestjs/testing";
import { randomUUID } from "crypto";
import { Input } from "./input";
import { ReceiverMessage } from "./receiver-message.use-case";

describe('Receiver Message', () => {
  let use_case: ReceiverMessage;
  let repository: FakeBeeRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ReceiverMessage,
        { provide: IBeeRepository, useClass: FakeBeeRepository },
      ],
    }).compile();

    use_case = moduleRef.get<ReceiverMessage>(ReceiverMessage);
    repository = moduleRef.get<IBeeRepository>(IBeeRepository) as FakeBeeRepository;
  });

  const input: Input = {
    sender: 'some-sender',
    content: 'some-content',
    receiver: 'some-receiver'
  }

  const bee: Partial<Bee> = {
    id: randomUUID(),
    name: 'some-name'
  }

  it.each([
    {
      should: 'receiver message from Bee successfuly',
      input,
      setup: () => {
        repository.findOne.mockResolvedValueOnce(bee);
      },
      expected: (result: any) => {
        expect(result).toBeUndefined();
      }
    },
    // ...
  ])('Should $should', async ({ setup, expected }) => {
    if (setup) setup();

    try {
      await use_case.execute(input);
      expected(null);
    } catch (error) {
      expected(error);
    }
  })
})