<template>
  <div>
    <div :key='item.id' v-for="item in layers">{{item.message}}</div>
  </div>
</template>
<script>
    export default({
        mounted(){
            this.id=0;
        },
        data(){
            return {
                layers:[]
            }
        },
        methods:{
            add(options){
                let layer={...options,id:++this.id}
                this.layers.push(layer);
                layer.timer=setTimeout(()=>{
                    this.remove(layer)
                },options.duration)
            },
            remove(layer){
                clearTimeout(layer.timer);
                this.layers=this.layers.filter((item)=>layer.id!==item.id)
            }
        }
    })
</script>