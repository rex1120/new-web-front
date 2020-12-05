import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router) ;

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

export default () => {
    return new Router({
        mode: 'hash',
        scrollBehavior(to, from, position) {
            if (position) {
                return position
            } else {
                return {x: 0, y: 0}
            }
        },
        routes:[
            {
                path: '/',
                name: '/',
                redirect:'/login',
            },

            {
                    path: '/login',
                    name: 'login',
                    component: resolve => require(['@/views/admin-panel/login.vue'], resolve),
                    meta: {name: '登录'}
                },
            {
                    path: '/main-view',
                    name: 'main-view',
                    component: resolve => require(['@/views/admin-panel/main-view/main-view.vue'], resolve),
                    meta: {name: '主页'}
                },




        ]
        // routes: [
        //     {
        //         path: '/FileConversion',
        //         name: 'FileConversion',
        //         component: resolve => require(['@/views/FileConversion/FileConversion'], resolve),
        //         meta: {name: '文件转换'}
        //     },
        //     {
        //         path: '/Home',
        //         name: 'Home',
        //         component: resolve => require(['@/views/Home/Home'], resolve),
        //         meta: {name: '首页'}
        //     },
        //     {
        //         path: '/Setting',
        //         name: 'Setting',
        //         component: resolve => require(['@/views/SysBase/Setting'], resolve),
        //         meta: {name: '设置'}
        //     },
        //     {
        //         path: '/UserSpace',
        //         name: 'UserSpace',
        //         component: resolve => require(['@/views/SysBase/User/UserSpace'], resolve),
        //         meta: {name: '个人空间'}
        //     },
        //      {
        //         path: '/SysUser',
        //         name: 'SysUser',
        //         component: resolve => require(['@/views/SysBase/User/SysUser'], resolve),
        //         meta: {name: '用户管理'}
        //     },
        //     {
        //         path: '/UserForm',
        //         name: 'UserForm',
        //         component: resolve => require(['@/views/SysBase/User/UserForm'], resolve),
        //         meta: {name: '新增用户'}
        //     },
        //     {
        //         path: '/SysMenu',
        //         name: 'SysMenu',
        //         component: resolve => require(['@/views/SysBase/Menu/SysMenu'], resolve),
        //         meta: {name: '菜单管理'}
        //     },
        //     {
        //         path: '/Login',
        //         name: 'Login',
        //         component: resolve => require(['@/views/SysBase/Login'], resolve),
        //         meta: {name: '登录页面'}
        //     },
        //
        //
        // ]
    })
}
