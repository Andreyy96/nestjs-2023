import { Injectable } from '@nestjs/common';

import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AuthCacheService {
  constructor(private readonly redisService: RedisService) {}

  public async saveToken(
    token: string,
    userId: string,
    deviceId: string,
  ): Promise<void> {
    const key = `ACCESS_TOKEN:${userId}:${deviceId}`;
    await this.redisService.addOneToSet(key, token);
  }
}
