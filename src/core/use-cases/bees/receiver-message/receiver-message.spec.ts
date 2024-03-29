import { Bee } from "@database/postgres/entities/bee.entity";
import { FakeBeeRepository } from "@database/postgres/repositories/fake/bee.repository.fake";
import { IBeeRepository } from "@database/postgres/repositories/interface/bee-repository.interface";
import { Test } from "@nestjs/testing";
import { NotFoundException } from "core/exceptions";
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
    sender: randomUUID(),
    receiver: randomUUID(),
    content: 'some-content',
  }

  const senderBee: Partial<Bee> = {
    id: input.sender,
    name: 'some-name'
  }

  const receiverBee: Partial<Bee> = {
    id: input.receiver,
    name: 'some-name'
  }


  it.each([
    {
      should: 'receiver message from Bee successfuly',
      input,
      setup: () => {
        repository.findOne.mockResolvedValueOnce(senderBee);
        repository.findOne.mockResolvedValueOnce(receiverBee);
      },
      expected: (result: any) => {
        expect(repository.findOne).toHaveBeenCalledTimes(2)
        expect(result).toBeUndefined();
      }
    },
    {
      should: 'throw if sender bee not found',
      input,
      setup: () => {
        repository.findOne.mockResolvedValueOnce(null);
        repository.findOne.mockResolvedValueOnce(receiverBee);
      },
      expected: (result: any) => {
        expect(result).toBeInstanceOf(NotFoundException);
      }
    },
    {
      should: 'throw if receiver bee not found',
      input,
      setup: () => {
        repository.findOne.mockResolvedValueOnce(senderBee);
        repository.findOne.mockResolvedValueOnce(null);
      },
      expected: (result: any) => {
        expect(result).toBeInstanceOf(NotFoundException);
      }
    },
  ])('Should $should', async ({ input, setup, expected }) => {
    if (setup) setup();

    try {
      await use_case.execute(input);
    } catch (error) {
      expected(error);
    }
  })
})