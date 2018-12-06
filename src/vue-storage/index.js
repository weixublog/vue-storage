import install from './install';
import { toString, toJSON, uuid } from './utils';

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
    let store;
    
    this.storage.forEach((s) => {
      if (s.store === name) store = s;
    });
    
    return store;
  }
  
  // 获取当前 store 的主键 默认 id
  primaryKey(store) {
    return this.getStorage(store).key || 'id';
  }
  
  isTypeMatched(store, value) {
    const storage = this.getStorage(store);
    
    return !storage || value.constructor === storage.type;
  }
  
  // 插入存储 (同样可以进行 update 操作)
  insert(store, value) {
    if (!this.isTypeMatched(store, value)) throw new Error('numatched type');
    window.localStorage.setItem(this.attachVersion(store), toString(value));
  }
  
  // 删除存储
  delete(store) {
    window.localStorage.removeItem(this.attachVersion(store));
  }
  
  // 更新存储
  update(store, value) {
    if (!this.isTypeMatched(store, value)) throw new Error('numatched type');
    this.insert(store, value);
  }
  
  // 查找存储
  query(store) {
    return toJSON(window.localStorage.getItem(this.attachVersion(store)));
  }
  
  /**
   * 插入一个元素(使用该方法，则对应的 store 必须要在初始化文件中定义)
   * @param store
   * @param value
   * @param key
   */
  insertItem(store, value, key = this.primaryKey(store)) {
    if (!value[key]) throw new Error(`the attr of ${key} is required`);
    const item = this.query(store);
    
    if (!Array.isArray(item)) {
      throw new Error('pleause use func of insert to insert none Array value');
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
    
    return this.insert(key, item);
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
      throw new Error('pleause use func of delete to delete none Array value');
    }
    
    const result = [];
    
    item.forEach((val) => {
      if (val[key] === value) {
        result.push(result);
      }
    });
    
    return result;
  }
  
  /**
   * 插入或者更新
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
}

VueStorage.install = install;
