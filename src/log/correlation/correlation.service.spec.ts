import { Test, TestingModule } from '@nestjs/testing';
import { CorrelationService } from './correlation.service';

describe('CorrelationService', () => {
  let service: CorrelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorrelationService],
    }).compile();

    service = module.get<CorrelationService>(CorrelationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
