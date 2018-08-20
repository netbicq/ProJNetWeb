import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: resolve => void(require(['@/components/login/login'], resolve))
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => void(require(['@/components/home/home'], resolve)),
      children: [{
        //用户管理
        path: '/system',
        name: 'system',
        component: resolve => void(require(['@/components/system/system'], resolve)),
        meta: {requiresAuth: true}
      }
      ,{
        //账套管理
        path: '/account',
        name: 'account',
        component: resolve => void(require(['@/components/component/account'], resolve)),
        meta: {requiresAuth: true}
      },{
        //账套信息
        path: '/AccountInfo/:id',
        name: 'AccountInfo',
        component: resolve => void(require(['@/components/component/AccountInfo'], resolve)),
        meta: {requiresAuth: true}
      },{
        //电子卡
        path: '/card',
        name: 'card',
        component: resolve => void(require(['@/components/component/card'], resolve)),
        meta: {requiresAuth: true}
      },{
        //设备
        path: '/device',
        name: 'device',
        component: resolve => void(require(['@/components/component/device'], resolve)),
        meta: {requiresAuth: true}
      },{
        //自定义报表
        path: '/RPTList',
        name: 'RPTList',
        component: resolve => void(require(['@/components/component/RPTList'], resolve)),
        meta: {requiresAuth: true}
      },{
        //报表参数
        path: '/RPTParameter',
        name: 'RPTParameter',
        component: resolve => void(require(['@/components/component/RPTParameter'], resolve)),
        meta: {requiresAuth: true}
      },{
        //报表列
        path: '/RPTColumn',
        name: 'RPTColumn',
        component: resolve => void(require(['@/components/component/RPTColumn'], resolve)),
        meta: {requiresAuth: true}
      },{
        //报表子表
        path: '/RPTChildTable',
        name: 'RPTChildeTable',
        component: resolve => void(require(['@/components/component/RPTChildeTable'], resolve)),
        meta: {requiresAuth: true}
      },
      {
        //日志
        path: '/logs',
        name: 'logs',
        component: resolve => void(require(['@/components/component/log'], resolve)),
        meta: {requiresAuth: true}
      }
      ]
    },
    {
      path: '/404',
      name: 'error',
      component: resolve => void(require(['@/components/component/404'], resolve)),
      redirect:'/'
    },
  ]
})
