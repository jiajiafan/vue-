<template>
  <div>
    <c-menu :data="data"></c-menu>
    <!-- <m-menu>
           <m-submenu>
               <template slot="title">导航一</template>
                
                    <m-menu-item>选项1.1</m-menu-item>
                    <m-menu-item>选项1.2</m-menu-item>
                <m-submenu>  
                    <template slot='title'>1.3</template>
                    <m-menu-item>1.3.1</m-menu-item>
                </m-submenu>
           </m-submenu>    
           <m-menu-item>导航二</m-menu-item>
           <m-menu-item>导航三</m-menu-item>
    </m-menu>-->
  </div>
</template>
<script>
import cMenu from "./component/c-menu";
export default {
  components: {
    cMenu
  },
  data() {
    return {
      data: [
        {
          name: "导航一",
          id: 1,
          children: [
            { name: "选项1.1", id: 1.1 },
            {
              name: "选项目1.2",
              id: 1.2,
              children: [
                {
                  name: "选项1.2.1",
                  id: 1.2
                }
              ]
            }
          ]
        },
        {
          name: "导航2",
          id: 2
        },
        {
          name: "导航3",
          id: 3
        }
      ]
    };
  }
};
</script>


