import config from 'Config/cache'; // eslint-disable-line import/no-unresolved
import ElastiCacheService from '../services/ElastiCacheService';
import LesgoException from '../exceptions/LesgoException';
import logger from './logger';

const FILE = 'Lesgo/utils/cache';

/**
 * Reusable instance
 */
const singleton = {};

/**
 * Instantiate the Cache Service
 *
 * @param {String} connectionName The name of the driver config to connect to
 * @return {object} Returns the driver
 */
const ec = (connectionName = '') => {
  const conn = connectionName || config.default;
  if (singleton[conn]) {
    return singleton[conn];
  }

  const { driver } = new ElastiCacheService({
    ...config.connections[conn],
  });

  singleton[conn] = driver;

  return driver;
};

/**
 * Fetch data from cache by key
 *
 * @param {string} key Cache key to fetch data.
 * @return {promise} Returns promised.
 */
const get = key => {
  return new Promise((res, rej) => {
    try {
      ec().get(key, (err, data) => {
        if (err) {
          rej(new LesgoException(err, 'CACHE_GET_ERROR'));
        } else {
          logger.debug(`${FILE}::Fetched cache data`, { data });
          res(data);
        }
      });
    } catch (err) {
      rej(new LesgoException(err.message, 'CACHE_GET_EXCEPTION', 500, err));
    }
  });
};

/**
 * Save data to cache
 *
 * @param {string} key Cache key to save data.
 * @param {string|object} val Value of data to cache.
 * @param {integer} lifetime Time in seconds to expire cache.
 * @return {promise} Returns promised.
 */
const set = (key, val, lifetime) => {
  return new Promise((res, rej) => {
    try {
      ec().set(key, val, lifetime, err => {
        if (err) {
          rej(new LesgoException(err, 'CACHE_SET_ERROR'));
        } else {
          logger.debug(`${FILE}::Cache stored`, { key, val, lifetime });
          res(true);
        }
      });
    } catch (err) {
      rej(new LesgoException(err.message, 'CACHE_SET_EXCEPTION', 500, err));
    }
  });
};

/**
 * Remove the key from cache
 *
 * @param {string} key Cache key to delete.
 * @return {promise} Returns promised.
 */
const del = key => {
  return new Promise((res, rej) => {
    try {
      ec().del(key, err => {
        if (err) {
          rej(new LesgoException(err, 'CACHE_DEL_ERROR'));
        } else {
          logger.debug(`${FILE}::Key deleted from cache`, { key });
          res(true);
        }
      });
    } catch (err) {
      rej(new LesgoException(err.message, 'CACHE_DEL_EXCEPTION', 500, err));
    }
  });
};

/**
 * Ends the connection
 *
 * @return {promise} Returns promised.
 */
const end = () => {
  return new Promise((res, rej) => {
    try {
      ec().end();
      return res();
    } catch (err) {
      return rej(
        new LesgoException(err.message, 'CACHE_END_EXCEPTION', 500, err)
      );
    }
  });
};

export default {
  ec,
  get,
  set,
  del,
  end,
  singleton,
};
