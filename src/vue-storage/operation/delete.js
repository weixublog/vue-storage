/**
 * delete the val of store
 * @param store
 * @private
 */
const _delete = function(store) {
  window.localStorage.removeItem(this.attachVersion(store));
};


/**
 * clear Array store
 * @param store
 */
const clear = function(store) {
  const storage = this.getStorage(store);

  if (!storage) throw new Error(`the store of ${store} is not exist`);
  if (storage.type !== Array) throw new Error('you are not allow to use clear on un Array');
  this.insert(store, []);
};

/**
 * 删除数组中的一个ITEM (根据主键) only Array
 * @param store
 * @param value
 * @param key
 */
const deleteItem = function(store, value, key = this.primaryKey(store)) {
  const item = this.query(store);

  if (!Array.isArray(item)) {
    throw new Error('pleause use func of delete to delete none Array value');
  }

  const index = item.findIndex((i) => i[key] === value);

  if (index > -1) {
    item.splice(index, 1);
  }
  else {
    throw new Error('the value does not exist');
  }

  return this.insert(store, item);
};


export default {
  delete : _delete,
  deleteItem,
  clear,
};
