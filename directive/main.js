import Vue from 'vue';
// 1.自动获取焦点
Vue.directives('focus', {
    inserted(el,binding,vnode) {
        el.focus()
    }
})
// 2.点击弹框以外区域，关闭弹框
Vue.directives('clickOutside', {
    bind(el,binding,vnode) {
        el.fn = (e) => {
            if (el.contains(e.target)) {
                vnode.context['focus']();
            } else {
                vnode.content['blure']();
            }
        }
          document.assEventListener('click',e.fn)
    },
    unbind(el) {
        document.removeEventListener('click',e.fn)
    }
})
// 