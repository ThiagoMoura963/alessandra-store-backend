import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ICacheService } from './interfaces/cache.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService implements ICacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCache<T>(
    functionRequest: () => Promise<T>,
    key?: string,
  ): Promise<T> {
    let allData: T | undefined;

    if (key) allData = await this.cacheManager.get(key);

    if (allData) return allData;

    const entities: T = await functionRequest();

    if (key) await this.cacheManager.set(key, entities);

    return entities;
  }
}
