import Vue from 'vue';
import myMessage from './myMessage';


let instance;
let getVueInstance = () => {
     instance= new Vue({
         render: h => h(myMessage)
     }).$mount()
     document.body.append(vm.$el)
}
const Message = {
    success(options) {
        !instance && getVueInstance()
        instance.$children[0].add({
            ...options,
            type: 'success'
        })
    }
}
export {
    Message
}
export default {
    install() {
        let $message = {}
        Object.keys(Message).forEach(key => {
            $message[key]=Message[key]
        })
        Vue.prototype.$message = $message;
    }
}
