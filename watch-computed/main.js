import Vue from 'vue';


new Vue({
    data() { 
        return {
            name: 'ajia',
        }
    },
    watch: {
        // name(newV) {
            
        // }
        name: {
            handler(newName) {
                
            },
            immediate: true,//立即执行handler
            deep: true,//深度监控
            lazy:true,//就是computed的实现
        }
    },
    computed: {
        //计算属性的最大特点是可以缓存
        //源码中设置了一个脏值dirty;
    }
})