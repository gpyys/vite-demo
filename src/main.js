import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import {store} from "./store/index"

createApp(App).use(store).use(Antd).mount('#app')

// import { createApp } from './mini-vue'
// createApp({
//   data(){
//     return{
//       title:'hello vite vue3'
//     }
//   },
//   render(){
//     const h3 = document.createElement("h3");
//     h3.textContent = this.title
//     return h3
//   },
//   mounted() {
//     setTimeout(() => {
//       this.title = 'wow  title changed!'
//     },2000)
//   },
// }).mount('#app')