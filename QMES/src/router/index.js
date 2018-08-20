import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//登录
const login = resolve => void(require(['@/components/login'], resolve))
const casket = resolve => require.ensure([], () => resolve(require('@/components/casket')), 'casket');
const index = resolve => require.ensure([], () => resolve(require('@/components/index.vue')), 'index');
const operator = resolve => require.ensure([], () => resolve(require('@/components/system/Operator.vue')), 'operator');
const log = resolve => require.ensure([], () => resolve(require('@/components/system/log.vue')), 'log');
const dirc = resolve => require.ensure([], () => resolve(require('@/components/basic/Disc.vue')), 'dirc');
const organzie = resolve => require.ensure([], () => resolve(require('@/components/basic/organzie.vue')), 'organzie');
const ElectronCard = resolve => require.ensure([], () => resolve(require('@/components/basic/ElectronCard.vue')), 'ElectronCard');
const EmployeeGroup = resolve => require.ensure([], () => resolve(require('@/components/basic/EmployeeGroup.vue')), 'EmployeeGroup');
const SpecShift = resolve => require.ensure([], () => resolve(require('@/components/basic/SpecShift.vue')), 'SpecShift');
const classes = resolve => require.ensure([], () => resolve(require('@/components/basic/classes.vue')), 'classes');
const Proce = resolve => require.ensure([], () => resolve(require('@/components/basic/Proce.vue')), 'Proce');
const ProceRule = resolve => require.ensure([], () => resolve(require('@/components/basic/ProceRule.vue')), 'ProceRule');
const SalaryItem = resolve => require.ensure([], () => resolve(require('@/components/EmployeeSalary/SalaryItem.vue')), 'SalaryItem');
const EmployeeList = resolve => require.ensure([], () => resolve(require('@/components/EmployeeSalary/EmployeeList.vue')), 'EmployeeList');
const EmployeeInfo = resolve => require.ensure([], () => resolve(require('@/components/EmployeeSalary/EmployeeInfo.vue')), 'EmployeeInfo');
const SalarySolution = resolve => require.ensure([], () => resolve(require('@/components/EmployeeSalary/SalarySolution.vue')), 'SalarySolution');
const SoulutionRule = resolve => require.ensure([], () => resolve(require('@/components/EmployeeSalary/SoulutionRule.vue')), 'SoulutionRule');
const SalaryData = resolve => require.ensure([], () => resolve(require('@/components/EmployeeSalary/SalaryData.vue')), 'SalaryData');
const SalaryItemData = resolve => require.ensure([], () => resolve(require('@/components/EmployeeSalary/SalaryItemData.vue')), 'SalaryItemData');
const SalaryItemDetail = resolve => require.ensure([], () => resolve(require('@/components/EmployeeSalary/SalaryItemDetail.vue')), 'SalaryItemDetail');
const DeviceInfo = resolve => require.ensure([], () => resolve(require('@/components/Device/DeviceInfo.vue')), 'DeviceInfo');
const DeviceLog = resolve => require.ensure([], () => resolve(require('@/components/Device/DeviceLog.vue')), 'DeviceLog');
const DeviceSourceData = resolve => require.ensure([], () => resolve(require('@/components/Device/DeviceSourceData.vue')), 'DeviceSourceData');
const report1 = resolve => require.ensure([], () => resolve(require('@/components/Report/report1.vue')), 'report1');
const errors = resolve => require.ensure([], () => resolve(require('@/components/404.vue')), 'errors');
const payrolldata = resolve => require.ensure([], () => resolve(require('@/components/EmployeeSalary/payrolldata.vue')), 'payrolldata');
const dayWages = resolve => require.ensure([], () => resolve(require('@/components/EmployeeSalary/dayWages.vue')), 'dayWages');
const dayRate = resolve => require.ensure([], () => resolve(require('@/components/EmployeeSalary/dayRate.vue')), 'dayRate');
const Monsalary = resolve => require.ensure([], () => resolve(require('@/components/EmployeeSalary/Monsalary.vue')), 'Monsalary');
   
Vue.use(Router)
EmployeeGroup
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
	      path: '*',
	      name: 'error',
	      component: errors,
	      redirect: "/"
	},
    {
	  path: '/casket',
      name: 'casket',
      component: casket,
      meta: {
        keepAlive: true // 需要被缓存
      },
      children:[
      	{
          path: '/index',
          name: 'index',
          component: index
        },
        {
          path: '/operator',
          name: 'operator',
          component: operator
        },
        {
          path: '/log',
          name: 'log',
          component: log
        },
      	{
          path: '/dirc',
          name: 'dirc',
          component: dirc
        },
        {
          path: '/organzie',
          name: 'organzie',
          component: organzie
        },
        {
          path: '/ElectronCard',
          name: 'ElectronCard',
          component: ElectronCard
        },
        {
          path: '/EmployeeGroup',
          name: 'EmployeeGroup',
          component: EmployeeGroup
        },
        {
          path: '/SpecShift',
          name: 'SpecShift',
          component: SpecShift
        },
        {
          path: '/classes',
          name: 'classes',
          component: classes
        },
        {
          path: '/Proce',
          name: 'Proce',
          component: Proce
        },
        {
          path: '/ProceRule',
          name: 'ProceRule',
          component: ProceRule
        },
        {
          path: '/SalaryItem',
          name: 'SalaryItem',
          component: SalaryItem
        },
        {
          path: '/EmployeeList',
          name: 'EmployeeList',
          component: EmployeeList
        },
        {
          path: '/EmployeeInfo',
          name: 'EmployeeInfo',
          component: EmployeeInfo
        },
        {
          path: '/SalarySolution',
          name: 'SalarySolution',
          component: SalarySolution
        },
        {
          path: '/SoulutionRule',
          name: 'SoulutionRule',
          component: SoulutionRule
        },
        {
          path: '/SalaryData',
          name: 'SalaryData',
          component: SalaryData
        },
        {
          path: '/SalaryItemData/:id?',
          name: 'SalaryItemData',
          component: SalaryItemData
        },
        {
          path: '/SalaryItemDetail/:id?',
          name: 'SalaryItemDetail',
          component: SalaryItemDetail
        },
        {
          path: '/payrolldata',
          name: 'payrolldata',
          component: payrolldata
        },
        {
          path: '/dayWages/:id?',
          name: 'dayWages',
          component: dayWages
        },
        {
          path: '/dayRate/:id?',
          name: 'dayRate',
          component: dayRate
        },
         {
          path: '/Monsalary',
          name: 'Monsalary',
          component: Monsalary

        },
        {
          path: '/DeviceInfo',
          name: 'DeviceInfo',
          component: DeviceInfo
        },
        {
          path: '/DeviceLog',
          name: 'DeviceLog',
          component: DeviceLog
        },
        {
          path: '/DeviceSourceData',
          name: 'DeviceSourceData',
          component: DeviceSourceData
        },
        {
          path: '/report1/:id',
          name: 'report1',
          component: report1
        },
      ]
    },
  ]
})