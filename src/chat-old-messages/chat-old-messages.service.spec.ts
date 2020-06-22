import { Test, TestingModule } from '@nestjs/testing';
import { ChatOldMessagesService } from './chat-old-messages.service';

describe('ChatOldMessagesService', () => {
  let service: ChatOldMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatOldMessagesService],
    }).compile();

    service = module.get<ChatOldMessagesService>(ChatOldMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
