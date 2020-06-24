import { Test, TestingModule } from '@nestjs/testing';
import { ChatOldMessagesController } from './chat-old-messages.controller';

describe('ChatOldMessages Controller', () => {
  let controller: ChatOldMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatOldMessagesController],
    }).compile();

    controller = module.get<ChatOldMessagesController>(ChatOldMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
