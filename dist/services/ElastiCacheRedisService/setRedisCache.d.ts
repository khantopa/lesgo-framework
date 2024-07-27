import { ClientOptions } from '../../types/aws';
export interface SetRedisCacheOptions {
    EX?: number;
    NX?: boolean;
}
declare const setRedisCache: (key: string, value: any, opts?: SetRedisCacheOptions, clientOpts?: ClientOptions) => Promise<string | null>;
export default setRedisCache;
