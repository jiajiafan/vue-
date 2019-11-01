import Vuex from 'vuex';
import Vue from 'vue';
import { join } from 'path';

Vue.use(Vuex);

const persits = (store) => {
    store.subscribe((mutation,state) => {
        localStorage.setItem('vuex-state', JSON.stringify(state))
        // commit的时候会触发这个函数
    })
}
export default new Vuex.Store({
    plugins: [
        persits
        // 解决vuex刷新数据丢失的问题
    ],
    state: {
        count:1
    },
    getters: {
        
    },
    mutations: {
        fn(state,payload){
            state.count=payload;
        }
    },
    actions: {
        fn(store,payload){
            commit(fn)
        }
    }
})

console.log(curring(a)(1)(2, 3)(4)) //10

