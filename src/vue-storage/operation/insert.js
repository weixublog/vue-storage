import { toString } from '../utils';

/**
 * inert vue to store
 * @param store
 * @param value
 */
const insert = function(store, value) {
  console.warn(this);
  if (!this.isTypeMatched(store, value)) throw new Error('numatched type');
  window.localStorage.setItem(this.attachVersion(store), toString(value));
};

/**
 * insert item to defined store ( only Array )
 * @param store
 * @param value
 * @param key
 */
const insertItem = function(store, value, key = this.primaryKey(store)) {
  if (!value[key]) throw new Error(`the attr of ${key} is required`);
  const item = this.query(store);

  if (!Array.isArray(item)) {
    throw new Error('please use func of insert to insert none Array value');
  }

  const index = item.findIndex((i) => i[key] === value[key]);

  if (index > -1) {
    throw new Error('the value exist');
  }
  else {
    item.push(value);
  }

  return this.insert(store, item);
};

export default {
  insert,
  insertItem,
};
