import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => void(require(['@/components/login'], resolve))
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => void(require(['@/components/home/home'], resolve)),
      children:[
      	{
		      path: '/Dashboard',
		      name: 'Dashboard',
		      component: resolve => void(require(['@/components/Dashboard'], resolve))
		    },
     	  {
		      path: '/system',
		      name: 'system',
		      component: resolve => void(require(['@/components/system'], resolve))
		    },
		    {
		      path: '/Basic',
		      name: 'Basic',
		      component: resolve => void(require(['@/components/Basic'], resolve))
		    },
		    {
		      path: '/dictionary',
		      name: 'dicr',
		      component: resolve => void(require(['@/components/dicr'], resolve))
		    },
      	{
		      path: '/proprietor',
		      name: 'Owner',
		      component: resolve => void(require(['@/components/Owner'], resolve))
		    },
      	{
		      path: '/project',
		      name: 'Project',
		      component: resolve => void(require(['@/components/Project'], resolve))
		    },
		    {
		      path: '/teamwork',
		      name: 'teamwork',
		      component: resolve => void(require(['@/components/teamwork'], resolve))
		    },
		    
		    {
		      path: '/report',
		      name: 'Report',
		      component: resolve => void(require(['@/components/Report'], resolve))
		    }
      ]
    },
  ]
})
