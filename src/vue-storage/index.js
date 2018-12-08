import install from './install';

import INSERT from './operation/insert';
import DELETE from './operation/delete';
import UPDATE from './operation/update';
import QUERY from './operation/query';

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
  // INSERT
  insert = INSERT.insert.bind(this);
  insertItem = INSERT.insertItem.bind(this);

  // DELETE
  delete = DELETE.delete.bind(this);
  clear = DELETE.clear.bind(this);
  deleteItem = DELETE.deleteItem.bind(this);

  // UPDATE
  update = UPDATE.update.bind(this);
  insertOrUpdate = UPDATE.insertOrUpdate.bind(this);

  // QUERY
  query = QUERY.query.bind(this);
  queryItem = QUERY.queryItem.bind(this);
}

VueStorage.install = install;
