import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsRepositoryService } from './permissions-repository.service';

describe('PermissionsRepositoryService', () => {
  let service: PermissionsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionsRepositoryService],
    }).compile();

    service = module.get<PermissionsRepositoryService>(PermissionsRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
