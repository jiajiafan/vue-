let Vue;
const forEach = (obj, cb) => {
    Object.keys(obj).forEach(key => {
        cb(key, obj[key])
    })
}
class ModuleCollection {
    constructor(options) {
        this.register([], options) //注册模块，将模块注册成树结构
    }
    register(path, rootModule) {
        let module = {
            _rawModule: rootModule,
            _children: {},
            state: rootModule.state
        }
        if (path.length === 0) {
            this.root = module; //如果是跟模块，将这个模块挂在根实例上
        } else {
            //vue中递归都用reduce方法
            let parent = path.slice(0, -1).reduce((root, current) => {
                return root._children[current]
            }, this.root)
            parent._children[path[path.length - 1]] = module;
        }
        // 看当前模块是否有modules属性
        if (rootModule.modules) { //module属性存在

            forEach(rootModule.modules, (moduleName, module) => {
                this.register(path.concat(moduleName), module)
            })
        }
    }
}
const installModule = (store, rootState, path, rootModule) => {
    if (path.length > 0) {
        // [a,c]
        // 是儿子，儿子要找到爸爸，把自己的状态放到上面去
        let parent = path.slice(0, -1).reduce((root,current) => {
            return root[current];
        },rootState)
        // vue 不能在对象上加不存在的属性，否则不会导致视图更新
        Vue.set(parent, path[path.length - 1], rootModule.state)
        // 
    }
    // 以下代码都是在处理 模块中 getters,actions mutation
    let getters = rootModule._rawModule.getters;
    if (getters) {
        forEach(getters, (getterName,fn) => {
            Object.defineProperty(store.getters, getterName, {
                get() {
                    // 让getter执行当自己的状态 传入
                    return fn(rootModule.state)//让对应的函数执行
                }
            })
        })
    }
    let mutations = rootModule._rawModule.mutations;
    if (mutations) {
        forEach(mutations, (mutationName, fn) => {
            let mutations = store.mutations[mutationName] || []
            mutations.push((payload) => {
                fn(rootModule.state, payload)
                store._subscribe.forEach(fn => fn({type:mutationName,payload},rootState))
            })
            store.mutations[mutationName] = mutations;
        })
    }
     if (actions) {
         forEach(actions, (actionName, fn) => {
             let actions = store.actions[actionName] || []
             actions.push((payload) => {
                 fn(store, payload)
             })
             store.actions[actionName] = actions;
         })
     }
    forEach(rootModule._children, (moduleName, module) => {
        installModule(store,rootState,path.concat(moduleName),module)
    })
    // 挂在儿子
}
class Store {
    constructor(options) {
        //核心定义了响应式变化，数据更新，更新视图；
        this.s = new Vue({
            data() {
                return {
                    state: options.state
                }
            }
        })
        this.getters = {};
        this.mutations = {}
        this.actions = {};
        this._subscribe = [];
        this._modules = new ModuleCollection(options); //把数据格式化成自己想要的数据结构
        // 递归将结果分类
        // this是整个store
        // this.state当前的根状态
        // []为了递归创建的 
        // this._modules.root 从跟模块开始安装
        installModule(this,this.state,[],this._modules.root)



        // let getters = options.getters;
        // forEach(getters, (getterName, fn) => {
        //     Object.defineProperty(this.getters, getterName, {
        //         get: () => {
        //             return fn(this.state)
        //         }
        //     })
        // })
        // let mutations = options.mutations;

        // forEach(mutations, (mutationName,fn) => {
        //     this.mutations[mutationName] = (payload) => {
        //         fn(this,state,payload)
        //     }
        // })
        // let actions = options.actions;

        // forEach(actions, (actionName,fn) => {
        //     this.actions[actionName] = (payload) => {
        //         fn(this,payload);
        //     }
        // })
        options.plugins.forEach(plugin => plugin(this))

    }
    subscribe(fn) {
        this._subscribe.push(fn)
    }
    commit = (mutationName, payload) => {
        this.mutations[mutationName].forEach(fn=>fn(payload))
    }
    dispatch(actionName, payload) {
        this.actions[actionName](payload)
    }
    get state() {
        return this.s.state
    }
}
const install = (_vue) => {
    Vue = _vue;
    Vue.mixin({
        beforeCreated() {
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store;
            }
        }
    })
}
export default {
    install,
    Store
}
//  源码会将 当前用户传递的module内容 进行格式化
// console.log(this.$store._modules)查看格式化的数据结构
// let root = {
//     _raw: options,
//     _children: {
//         a: {
            // _raw:{},
            // _children: {
            //     c: {

            //     }
            // },
            // state:{a:1}
//         },
//         b: {

//         }
//     },
//     state:options.state
// }