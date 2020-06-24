import { Test, TestingModule } from '@nestjs/testing';
import { ChatRepositoryService } from './chat-repository.service';

describe('ChatRepositoryService', () => {
  let service: ChatRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRepositoryService],
    }).compile();

    service = module.get<ChatRepositoryService>(ChatRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
