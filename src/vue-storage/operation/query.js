// 查找存储
import { toJSON } from '../utils';

const query = function(store) {
  return toJSON(window.localStorage.getItem(this.attachVersion(store)));
};


/**
 * 查询 store 中的 ITEM only Array
 * @param store
 * @param value
 * @param key
 */
const queryItem = function(store, value, key = this.primaryKey(store)) {
  const item = this.query(store);

  if (!Array.isArray(item)) {
    throw new Error('please use func of delete to delete none Array value');
  }

  const result = [];

  item.forEach((val) => {
    if (val[key] === value) {
      result.push(val);
    }
  });

  return result.length === 1 ? result[0] : result;
};

export default {
  query,
  queryItem,
};
