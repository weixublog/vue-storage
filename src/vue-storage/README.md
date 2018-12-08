# vue-storage

## Describe

> this plugin provide a easy access to operation localStorage

## data type

> the data type we support: String, Boolean , Number, Object , Array 

## How to use
```
$ npm install vue2-localstorage
$ yarn add vue2-localstorage
```

## Create Instance
```
import Vue from 'vue';
import VueStorage from 'vue2-localstorage';

Vue.use(VueStorage);

const storage = new VueStorage({
  dbName  : 'test-example',
  version : 'V1', 
  storage : [
    { 
      store   : 'ACCOUNT_LIST',
      type    : Array,
      key     : 'id',
      default : [],
    },
    {
      store   : 'IS_DEV',
      type    : Boolean,
      default : true,
    },
    {
      store   : 'APP_VERSION',
      type    : Number,
      default : 1,
    },
    {
      store   : 'TEST_SERVER',
      type    : Object,
      default : { address: '192.168.112.165', port: '8080' },
    },
  ],
});

if (process.env.NODE_ENV === 'development') {
  window.storage = storage;
}
export default storage;

```

## the methods are as following

### insert

> insert

```
this.$storage.insert('TEST_SERVER', { address: '10.200.112.165', port: '7777' });
```

> insertItem (only Array)
```
this.$storage.insertItem('ACCOUNT_LIST', 
      {
        id   : uuid.v1(),
        name : 'ZhangSan',
        age  : 22,
        sex  : 'M',
      });
```

### delete

> delete
```
this.$storage.delete('TEST_SERVER');
```

> deleteItem (only Array)
```
this.$storage.deleteItem('ACCOUNT_LIST', id);
```

> clear (only Array)
```
this.$storage.clear('ACCOUNT_LIST');
```

### update

> update
```
this.$storage.update('TEST_SERVER', { address: '192.168.112.165', port: '8080' });
```

> insertOrUpdate 
```
// Array
this.$storage.insertOrUpdate('ACCOUNT_LIST', 
      {
        id   : uuid.v1(),
        name : 'Lisi',
        age  : 26,
        sex  : 'M',
      });
      
// un Array
this.$storage.insertOrUpdate('TEST_SERVER', { address: '192.168.1.1', port: '8088' });
```

### query

> query
```
this.$storage.query('TEST_SERVER');
```

> queryItem (only Array)
```
this.$storage.queryItem('TEST_SERVER', id);
```

