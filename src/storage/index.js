import Vue from 'vue';
import VueStorage from '../vue-storage';

Vue.use(VueStorage);

const storage = new VueStorage({
  DB_NAME : 'test-example',
  DE_KEY  : 'id',
  VERSION : 'V1',
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
