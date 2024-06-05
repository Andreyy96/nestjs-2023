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

  public async isAccessTokenExist(
    userId: string,
    deviceId: string,
    token: string,
  ): Promise<boolean> {
    const key = this.getKey(userId, deviceId);
    const set = await this.redisService.sMembers(key);
    return set.includes(token);
  }
  public async deleteToken(userId: string, deviceId: string): Promise<void> {
    const key = this.getKey(userId, deviceId);
    await this.redisService.deleteByKey(key);
  }

  private getKey(userId: string, deviceId: string): string {
    return `ACCESS_TOKEN:${userId}:${deviceId}`;
  }
}
