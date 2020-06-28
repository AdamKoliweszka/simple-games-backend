import { Test, TestingModule } from '@nestjs/testing';
import { FriendsRepositoryService } from './friends-repository.service';

describe('FriendsRepositoryService', () => {
  let service: FriendsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendsRepositoryService],
    }).compile();

    service = module.get<FriendsRepositoryService>(FriendsRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
