import Vue from 'vue';
import VueStorage from '../../vue-storage';

Vue.use(VueStorage);

const storage = new VueStorage({
  dbName  : 'test-example',
  version : 'V1', // 可能会保存多版本的数据信息
  storage : [
    { // 登录的用户
      store   : 'ACCOUNT_LIST',
      type    : Array,
      key     : 'id',
      default : [],
    },
    { // 当前设备的唯一标志
      store   : 'MESSAGE_RECORD',
      type    : Array,
      key     : 'id',
      default : [],
    },
    {
      store   : 'RECENT_CHAT_LIST',
      type    : Array,
      key     : 'id',
      default : [],
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
