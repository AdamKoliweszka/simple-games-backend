import { Test, TestingModule } from '@nestjs/testing';
import { TokensFabricService } from './tokens-fabric.service';

describe('TokensFabricService', () => {
  let service: TokensFabricService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokensFabricService],
    }).compile();

    service = module.get<TokensFabricService>(TokensFabricService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
