import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
    el: "#app",
    render: h => h(App)
})
// npm install @vue/cli@3 -g
// npm install -g @vue/cli-service-global@3 -g