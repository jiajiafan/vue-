<template>
    <div>
        <h1>message实现</h1>
        <button @click='show'>弹层</button>
    </div>
</template>
<script>
import Vue from 'vue';
import Message from './message';
Vue.use(Message);

    export default{
        methods:{
            show(){
                this.$message.success({
                    message:'你好',
                    duration:3000
                })
            }
        }
    }
</script>