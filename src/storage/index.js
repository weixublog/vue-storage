import Vue from 'vue';
import VueStorage from '../vue-storage';

Vue.use(VueStorage);

const storage = new VueStorage({
  DB_NAME : 'test-example',
  DE_KEY  : 'id',
  VERSION : 'v1',
  storage : [
    {
      store   : 'account-list',
      type    : Array,
      key     : 'id',
      default : [],
    },
    {
      store   : 'remember-password',
      type    : Boolean,
      default : true,
    },
    {
      store   : 'join-info',
      type    : Object,
      default : { account: '13123371892', password: '123456' },
    },
  ],
});

if (process.env.NODE_ENV === 'development') {
  window.storage = storage;
}
export default storage;
