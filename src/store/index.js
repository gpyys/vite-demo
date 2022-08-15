// import { createStore } from "vuex";

import { createStore } from "../mini-vuex/index";

const store = createStore({
  state(){
    return{
      count:1,
    }
  },
  mutations:{
    add(state){
      state.count++
    }
  },
  getters:{
    doubleCounter(state){
      return state.count*2
    }
  },
  actions:{
    add2({commit}){
      setTimeout(() => {
        commit('add')
      })
    }
  }
})

export {store}