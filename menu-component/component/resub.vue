<template>
        <m-submenu>
            <template slot="title">{{data.name}}</template>
            <template v-for="c in data.children">
                <a-sub :data='c' :key='c.id' v-if='c.children'></a-sub>
                 <m-menu-item :key='c.id' v-else>{{c.name}}</m-menu-item>
            </template>
           
        </m-submenu> 
</template>
<script>
import mMenuItem from "./m-menu-item";
import mSubmenu from "./m-submenu";
    export default{
    name:"aSub",
      props:{
          data:{
              type:Object,
              default:()=>({})
          }
      },
      components:{
          mMenuItem,
          mSubmenu
      }
}
</script>