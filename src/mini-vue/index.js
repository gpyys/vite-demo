export function createApp(rootComponent) {
  // const app = ensureRenderer().createApp(rootComponent);
  // const mount = app.mount;
  // app.mount = function (selectorOrContainer) {
  //   const container = document.querySelector(selectorOrContainer)
  //   mount(container)
  // };
  // return app;
  
  return {
    mount(selector){
      const myselector =  document.querySelector(selector)
      const res = rootComponent.render.call(rootComponent.data())
      myselector.appendChild(res)
    }
  }
}