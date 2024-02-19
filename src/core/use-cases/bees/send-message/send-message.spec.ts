import { Bee } from "@database/postgres/entities/bee.entity";
import { FakeBeeRepository } from "@database/postgres/repositories/fake/bee.repository.fake";
import { IBeeRepository } from "@database/postgres/repositories/interface/bee-repository.interface";
import { module_mock } from "app.module.mock";
import { NotFoundException } from "core/exceptions";
import { randomUUID } from "crypto";
import { SqsService } from "sqs/sqs.service";
import { Input } from "./input";
import { SendMessage } from "./send-message.use-case";

describe('Send Message', () => {
  let use_case: SendMessage;
  let repository: FakeBeeRepository;

  let sqsServer: Partial<SqsService> = {}

  beforeEach(async () => {
    const moduleRef = await module_mock()
    use_case = moduleRef.get<SendMessage>(SendMessage);
    repository = moduleRef.get<IBeeRepository>(IBeeRepository) as FakeBeeRepository;
    sqsServer = moduleRef.get<SqsService>(SqsService);
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
      should: 'send message from Bee successfuly',
      input,
      setup: () => {
        repository.findOne.mockResolvedValueOnce(senderBee);
        repository.findOne.mockResolvedValueOnce(receiverBee);
      },
      expected: (result: any) => {
        expect(sqsServer.sendMessage).toHaveBeenCalledWith(JSON.stringify({
          sender: senderBee.id,
          receiver: receiverBee.id,
          content: input.content,
        }))
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