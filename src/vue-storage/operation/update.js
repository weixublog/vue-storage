
/**
 * maybe the same as insert
 */
const update = function(store, value) {
  if (!this.isTypeMatched(store, value)) throw new Error('numatched type');
  this.insert(store, value);
};

/**
 * insert or update the item of item (only Array)
 * @param store
 * @param value
 * @param key
 */
const insertOrUpdate = function(store, value, key = this.primaryKey(store)) {
  if (!value[key]) throw new Error(`the attr of ${key} is required`);
  const item = this.query(store);

  if (!Array.isArray(item)) { // none Array
    return this.insert(store, value);
  }

  const index = item.findIndex((i) => i[key] === value[key]);

  if (index > -1) {
    item[index] = value;
  }
  else {
    item.push(value);
  }

  return this.insert(store, item);
};

export default {
  update,
  insertOrUpdate,
};
