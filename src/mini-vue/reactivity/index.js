// 当前活动的副作用
let activeEffect

export function effect (fn){
  activeEffect = fn
}

export function reactive(obj){
  return new Proxy(obj,{
    get(target,key){
      const value = Reflect.get(target,key)
      //依赖收集
      track(target,key)
      return value
    },
    set(target,key,value){
      const result = Reflect.set(target,key,value)
      //依赖触发
      trigger(target,key)
      return result
    },
    deleteProperty(target,key){
      const result = Reflect.deleteProperty(target,key)
      trigger(target,key)
      return result
    },
  })
}
const targetMap =new WeakMap()

function track(target,key){
  if(activeEffect){
    let depsMap = targetMap.get(target)
    if(!depsMap){
      targetMap.set(target,(depsMap = new Map()))
    }
    let deps = depsMap.get(key)
    if(!deps){
      depsMap.set(key,(deps = new Set()))
    }

    deps.add(activeEffect)
  }
}

function trigger(target,key){
  const depsMap = targetMap.get(target)
  if(depsMap){
    const deps = depsMap.get(key)
    if(deps){
      deps.forEach(fn  => fn());
    }
  }
}