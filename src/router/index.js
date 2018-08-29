import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
//{
////    path: '/',
////    name: 'Auth',
////    component: resolve => void(require(['@/components/Auth'], resolve)),
//  }, 
    {
      path: '/',
      name: 'Home',
      component: resolve => void(require(['@/components/Home'], resolve)),
    }, //首页
    {
      path: '/login',
      name: 'login',
      component: resolve => void(require(['@/components/login'], resolve)),
    },
    {
      path: '/powe',
      name: 'powe',
      component: resolve => void(require(['@/components/powe'], resolve)),
    }, 
    //===============================信息查询==================================
    {
      path: '/InfoQuery/:id',
      name: 'InfoQuery',
      component: resolve => void(require(['@/components/info/InfoQuery'], resolve)),
    }, //信息查询
    {
      path: '/Guide/:id',
      name: 'Guide',
      component: resolve => void(require(['@/components/info/Guide'], resolve)),
    }, //办事指南
    {
      path: '/Policy/:id',
      name: 'Policy',
      component: resolve => void(require(['@/components/info/Policy'], resolve)),
    }, //文章列表 政策发布
    {
      path: '/Statute/:id',
      name: 'Statute',
      component: resolve => void(require(['@/components/info/Statute'], resolve)),
    }, //文章列表 法律法规
    {
      path: '/Agency/:id',
      name: 'Agency',
      component: resolve => void(require(['@/components/info/Agency'], resolve)),
    }, //文章列表 服务机构
    {
      path: '/AgencyDetails/:id',
      name: 'AgencyDetails',
      component: resolve => void(require(['@/components/info/AgencyDetails'], resolve)),
    }, //文章列表 服务机构
    {
      path: '/AgenMyDetail/:id',
      name: 'AgenMyDetail',
      component: resolve => void(require(['@/components/info/AgenMyDetail'], resolve)),
    }, //文章列表 服务机构
    
    {
      path: '/Case/:id',
      name: 'Case',
      component: resolve => void(require(['@/components/info/Case'], resolve)),
    }, //文章列表 以案释法


    //===============================信息查询==================================

    //===============================法律服务=================================
    {
      path: '/LegalService/:id?',
      name: 'LegalService',
      component: resolve => void(require(['@/components/lawservice/LegalService'], resolve)),
    }, //法律服务
    {
      path: '/Consultation/:id',
      name: 'Consultation',
      component: resolve => void(require(['@/components/lawservice/Consultation'], resolve)),
    }, //法律咨询
    {
      path: '/NotarDetails/:id',
      name: 'NotarDetails',
      component: resolve => void(require(['@/components/lawservice/NotarDetails'], resolve)),
    }, //法律咨询详情
    {
      path: '/leAdvi',
      name: 'leAdvi',
      component: resolve => void(require(['@/components/lawservice/leAdvi'], resolve)),
    }, //法律咨询新建
    
    {
      path: '/Problem',
      name: 'Problem',
      component: resolve => void(require(['@/components/lawservice/Problem'], resolve)),
    }, //常见法律问题
    {
      path: '/LawAid/:id/:type?',
      name: 'LawAid',
      component: resolve => void(require(['@/components/lawservice/LawAid'], resolve)),
    }, //法律援助
    {
      path: '/compose/:id?',
      name: 'compose',
      component: resolve => void(require(['@/components/lawservice/compose'], resolve)),
    }, //人民调解
    {
      path: '/SubResult',
      name: 'SubResult',
      component: resolve => void(require(['@/components/lawservice/SubResult'], resolve)),
    }, //法律援助 提交返回结果页
    {
      path: '/Notarization/:id',
      name: 'Notarization',
      component: resolve => void(require(['@/components/lawservice/Notarization'], resolve)),
    }, //公证办理
    {
      path: '/InfoReport',
      name: 'InfoReport',
      component: resolve => void(require(['@/components/lawservice/InfoReport'], resolve)),
    }, //信息上报
    {
      path: '/InfoReports/:id',
      name: 'InfoReports',
      component: resolve => void(require(['@/components/lawservice/InfoReports'], resolve)),
    }, //信息上报
    {
      path: '/Services/:id',
      name: 'Services',
      component: resolve => void(require(['@/components/lawservice/Services'], resolve)),
    }, //信息上报
    
    
    //===============================法律服务=================================


    //===============================在线活动=================================
    {
      path: '/OnlineActivity/:id',
      name: 'OnlineActivity',
      component: resolve => void(require(['@/components/activity/OnlineActivity'], resolve)),
    }, //在线活动
    {
      path: '/Survey',
      name: 'Survey',
      component: resolve => void(require(['@/components/activity/Survey'], resolve)),
    }, //需求调研
    {
      path: '/Matrix',
      name: 'Matrix',
      component: resolve => void(require(['@/components/activity/Matrix'], resolve)),
    }, //微信矩阵
    {
      path: '/Complaint',
      name: 'Complaint',
      component: resolve => void(require(['@/components/activity/Complaint'], resolve)),
    }, //投诉建议

    //===============================在线活动=================================

    //===============================向阳之旅=================================
    {
      path: '/SunTour',
      name: 'SunTour',
      component: resolve => void(require(['@/components/suntour/SunTour'], resolve)),
    }, //向阳之旅
    {
      path: '/Notice',
      name: 'Notice',
      component: resolve => void(require(['@/components/suntour/Notice'], resolve)),
    }, //公告
    {
      path: '/NoticeDetails/:id',
      name: 'NoticeDetails',
      component: resolve => void(require(['@/components/suntour/NoticeDetails'], resolve)),
    }, //公告详情
    {
      path: '/Study/:id',
      name: 'Study',
      component: resolve => void(require(['@/components/suntour/Study'], resolve)),
    }, //教育学习
    {
      path: '/Visit',
      name: 'Visit',
      component: resolve => void(require(['@/components/suntour/Visit'], resolve)),
    }, //接受走访
    {
      path: '/Report',
      name: 'Report',
      component: resolve => void(require(['@/components/suntour/Report'], resolve)),
    }, //月汇报
    {
      path: '/StudyDetail/:id',
      name: 'StudyDetail',
      component: resolve => void(require(['@/components/details/StudyDetail'], resolve)),
    }, //教育详情
    {
      path: '/severDetail/:id',
      name: 'severDetail',
      component: resolve => void(require(['@/components/details/severDetail'], resolve)),
    }, //服务详情
    {
      path: '/VisitDetail/:id',
      name: 'VisitDetail',
      component: resolve => void(require(['@/components/details/VisitDetail'], resolve)),
    }, //走访详情
    
    //===============================向阳之旅=================================
    {
      path: '/Details/:id',
      name: 'Detail',
      component: resolve => void(require(['@/components/details/Details'], resolve)),
    }, //详情
    {
      path: '/videoDetails/:id',
      name: 'videoDetails',
      component: resolve => void(require(['@/components/details/videoDetails'], resolve)),
    }, //视频详情
    {
      path: '/Community',
      name: 'Community',
      component: resolve => void(require(['@/components/Community'], resolve)),
    }, //社群管理
    {
      path: '/Onapprove',
      name: 'Onapprove',
      component: resolve => void(require(['@/components/approve/Onapprove'], resolve)),
    }, //在线审批
    {
      path: '/appdetails/:id',
      name: 'appdetails',
      component: resolve => void(require(['@/components/approve/appdetails'], resolve)),
    }, //在线审批
    {
      path: '/leAidetails/:id',
      name: 'leAidetails',
      component: resolve => void(require(['@/components/approve/leAidetails'], resolve)),
    }, //法律援助审批
    {
      path: '/appCurrency/:id',
      name: 'appCurrency',
      component: resolve => void(require(['@/components/approve/appCurrency'], resolve)),
    }, //不需要权限在线审批详情
    {
      path: '/leAidCurr/:id',
      name: 'leAidCurr',
      component: resolve => void(require(['@/components/approve/leAidCurr'], resolve)),
    }, //不需要权限法律援助审批
    {
      path: '/evaluate/:id',
      name: 'evaluate',
      component: resolve => void(require(['@/components/approve/evaluate'], resolve)),
    }, //评价
    {
      path: '/evaluates/:id',
      name: 'evaluates',
      component: resolve => void(require(['@/components/lawservice/evaluates'], resolve)),
    }, //评价
    {
      path: '/levaluate/:id',
      name: 'levaluate',
      component: resolve => void(require(['@/components/approve/levaluate'], resolve)),
    }, //评价
    {
      path: '/reply/:id',
      name: 'reply',
      component: resolve => void(require(['@/components/lawservice/reply'], resolve)),
    } //回复

  ]
})