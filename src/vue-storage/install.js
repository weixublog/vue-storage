export let _Vue;

export default function install(Vue) {

  if (install.installed && Vue === _Vue) return;

  install.installed = true;
  _Vue = Vue;

  Vue.mixin({
    beforeCreate: initVueStorage,
  })

  function initVueStorage() {
    const options = this.$options;

    if (options.storage) {
      this.$storage = options.storage;
    } else if (options.parent && options.parent.$storage) {
      this.$storage = options.parent.$storage;
    }

  }
}