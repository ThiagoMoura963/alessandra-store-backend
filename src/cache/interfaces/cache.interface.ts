export interface ICacheService {
  getCache<T>(functionRequest: () => Promise<T>, key?: string): Promise<T>;
}
