import install from './install';
import { toJSON } from './utils';

// import INSERT from './operation/insert';
// import DELETE from './operation/delete';
// import UPDATE from './operation/update';
// import QUERY from './operation/query';

export default class VueStorage {
  constructor(options = {}) {
    this.storage = options.storage || [];
    this.dbName = options.dbName;
    this.version = options.version || 'V1';
    this.init();
  }
  
  init(storage = this.storage) {
    if (!storage || !Array.isArray(storage)) return;
    storage.forEach((s) => {
      if (!s.key && s.type === Array) console.warn(`it is better to provide key for ${s.store}`);
      
      const value = this.query(s.store);
      
      if (!value && value !== s.default) {
        this.insert(s.store, s.default);
      }
    });
  }
  
  attachVersion(key) {
    return `${this.version}_${key}`;
  }
  
  getStorage(name) {
    let store = null;
    
    this.storage.forEach((s) => {
      if (s.store === name) store = s;
    });
    
    return store;
  }
  
  // 获取当前 store 的主键 默认 id
  primaryKey(store) {
    return (this.getStorage(store) || {}).key || 'id';
  }
  
  isTypeMatched(store, value) {
    const storage = this.getStorage(store);
    
    return !storage || value.constructor === storage.type;
  }
  // // INSERT
  // insert = INSERT.insert.bind(this);
  // insertItem = INSERT.insertItem.bind(this);
  //
  // // DELETE
  // delete = DELETE.delete.bind(this);
  // clear = DELETE.clear.bind(this);
  // deleteItem = DELETE.deleteItem.bind(this);
  //
  // // UPDATE
  // update = UPDATE.update.bind(this);
  // insertOrUpdate = UPDATE.insertOrUpdate.bind(this);
  //
  // // QUERY
  // query = QUERY.query.bind(this);
  // queryItem = QUERY.queryItem.bind(this);
  /**
   * inert vue to store
   * @param store
   * @param value
   */
  insert(store, value) {
    if (!this.isTypeMatched(store, value)) throw new Error('numatched type');
    window.localStorage.setItem(this.attachVersion(store), toString(value));
  }

  /**
   * insert item to defined store ( only Array )
   * @param store
   * @param value
   * @param key
   */
  insertItem(store, value, key = this.primaryKey(store)) {
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
  }

  /**
   * delete the val of store
   * @param store
   * @private
   */
  delete(store) {
    window.localStorage.removeItem(this.attachVersion(store));
  }


  /**
   * clear Array store
   * @param store
   */
  clear(store) {
    const storage = this.getStorage(store);

    if (!storage) throw new Error(`the store of ${store} is not exist`);
    if (storage.type !== Array) throw new Error('you are not allow to use clear on un Array');
    this.insert(store, []);
  }

  /**
   * 删除数组中的一个ITEM (根据主键) only Array
   * @param store
   * @param value
   * @param key
   */
  deleteItem(store, value, key = this.primaryKey(store)) {
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
  }


  /**
   * maybe the same as insert
   */
  update(store, value) {
    if (!this.isTypeMatched(store, value)) throw new Error('numatched type');
    this.insert(store, value);
  }

  /**
   * insert or update the item of item (only Array)
   * @param store
   * @param value
   * @param key
   */
  insertOrUpdate(store, value, key = this.primaryKey(store)) {
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
  }

  query(store) {
    return toJSON(window.localStorage.getItem(this.attachVersion(store)));
  }


  /**
   * 查询 store 中的 ITEM only Array
   * @param store
   * @param value
   * @param key
   */
  queryItem(store, value, key = this.primaryKey(store)) {
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
  }
}

VueStorage.install = install;
