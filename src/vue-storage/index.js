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
      if(!s.key && s.type === Array) console.warn(`it is better to provide key for ${s.store}`);

      const value = this.query(s.store);
      if (!value && value !== s.default) {
        this.insert(s.store, s.default);
      }
    })
  }

  attachVersion(key) {
    return `${this.version}_${key}`;
  }
  // 获取当前 store 的主键 默认 id
  primaryKey(store) {
    let key;

    this.storage.forEach((s) => {
      if (s.store === store) key = store.key;
    })

    return key || 'id';
  }

  // 插入存储 (同样可以进行 update 操作)
  insert(store, value) {
    window.localStorage.setItem(this.attachVersion(store), toString(value));
  }

  // 删除存储
  delete(store) {
    window.localStorage.removeItem(this.attachVersion(store));
  }

  // 更新存储
  update(store, value) {
    this.insert(store, value);
  }
  // 查找存储
  query(store) {
    return toJSON(window.localStorage.getItem(this.attachVersion(store)));
  }

  insertItem(store, value, key = this.primaryKey(store)) {
    if (!value[key]) throw new Error(`the attr of ${key} is required`);
    let item = this.query(key);

    if (!Array.isArray(item)) { throw new Error('pleause use func of insert to inset none Array value'); }

    const index = item.findIndex((i) => i[key] === value[key]);

    if (index > -1) {
      throw new Error('the value exist');
    }
    else {
      item.push(value);
    }

    return this.insert(key, item);
  }

  // deleteItem(key, id) {
  //   let item = this.query(key);

  //   if (Array.isArray(item)) {
  //     const index = item.findIndex((i) => i.id === id);

  //     if (index > -1) {
  //       item.splice(index, 1);
  //     }
  //   }
  //   else if (item.id === id) item = null;

  //   return this.insert(key, item);
  // }

}

VueStorage.install = install;