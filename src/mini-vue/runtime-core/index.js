import { effect, reactive } from "../reactivity"

export function createRenderer(options) {
  const render = (rootComponent, selector) => {
    // 1、获取宿主元素
    const myselector = options.querySelector(selector)
    // 2、渲染视图
    const observed = reactive(rootComponent.data())
    // 3、为组件定义一个更新函数
    const componentUpdateFn = () => {
      const res = rootComponent.render.call(observed)
      // 4、追加到宿主
      options.insert(res,myselector)
    }

    effect(componentUpdateFn)
    //初始化执行一次
    componentUpdateFn()

    if(rootComponent.mounted){
      rootComponent.mounted.call(observed)
    }
    
  }
  return {
    render,
    createApp: createAppAPI(render)
  }
}

export function createAppAPI(render) {
  return function createApp(rootComponent) {
    const app = {
      mount(selector) {
        render(rootComponent, selector)
      }
    }
    return app
  }

}