import { ClientOptions } from '../../../types/aws';
import { getRedisCache } from '../../../services/ElastiCacheRedisService';

const getCache = (key: string, clientOpts?: ClientOptions) => {
  return getRedisCache(key, clientOpts);
};

export default getCache;
