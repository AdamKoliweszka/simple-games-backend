import { Test, TestingModule } from '@nestjs/testing';
import { LoginInfoRepositoryService } from './login-info-repository.service';

describe('LoginInfoRepositoryService', () => {
  let service: LoginInfoRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginInfoRepositoryService],
    }).compile();

    service = module.get<LoginInfoRepositoryService>(LoginInfoRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
