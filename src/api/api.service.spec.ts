import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { EnvService } from 'src/env/env.service';
import { ConstantService } from 'src/constant/constant.service';
import { LogService } from 'src/log/log.service';
import { InstagramUsersDto } from './api.dto';

describe('ApiService', () => {
  let service: ApiService;

  // Mock bağımlılıklar
  const mockEnvService = {
    envConfig: {
      RAPID_API_KEY: 'test-api-key'
    }
  };

  const mockConstantService = {
    FETCH_FOLLOWER_AMOUNT: 50
  };

  const mockLogService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiService,
        { provide: EnvService, useValue: mockEnvService },
        { provide: ConstantService, useValue: mockConstantService },
        { provide: LogService, useValue: mockLogService }
      ],
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return mapped followings', async () => {
    // Mock fetchFollowings sonucu

    //@ts-ignore
    const mockFollowingsData: InstagramUsersDto = {
      data: {
        items: [
          {
            is_verified: true,
            is_private: false,
            username: 'testuser1',
          },
          {
            is_verified: false,
            is_private: true,
            username: 'testuser2',
          }
        ]
      } as any
    };

    // Beklenen çıktı
    const expectedOutput = [
      {
        isVerified: true,
        isPrivate: false,
        username: 'testuser1',
      },
      {
        isVerified: false,
        isPrivate: true,
        username: 'testuser2',
      }
    ];

    // fetchFollowings için spy oluştur
    jest.spyOn<any, any>(service, 'fetchFollowings').mockResolvedValue(mockFollowingsData);

    // Test edilen metodu çağır
    const result = await service.followings('testuser');

    // Sonucu doğrula
    expect(result).toEqual(expectedOutput);
    expect(service['fetchFollowings']).toHaveBeenCalledWith('testuser');
  });
});
