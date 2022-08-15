import {
  reactive,
  computed
} from "vue"

export function createStore(options) {
  const store = {
    _state: reactive(options.state()),
    get state() {
      return this._state
    },
    set state(v) {
      console.error('err')
    },
    _mutations: options.mutations,
    _actions: options.actions,
  }

  function commit(type, payload) {
    let entry = this._mutations[type]
    if (!entry) {
      console.error('commit err');
    }
    entry.call(this.state, this.state, payload)
  }
  store.commit= commit.bind(store)


  function dispatch(type, payload) {
    let entry = this._actions[type]
    if (!entry) {
      console.error('commit err');
    }
    entry.call(this, this, payload)
  }
  store.dispatch = dispatch.bind(store)


  store.getters = {}

  Object.keys(options.getters).forEach(key =>{
    // store.getters[key] = options.getters[key](store)

    const result =computed(() => {
      const getter = options.getters[key]
      if(getter){
        return getter.call(store,store.state)
      }
    })
    Object.defineProperty(store.getters,key,{
      get(){
       return result
      }
    })
  })

  store.install = function (app) {
    const store = this
    app.config.globalProperties.$store = store
  }

  return store
}