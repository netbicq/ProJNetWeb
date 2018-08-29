export default {
    hostname:Host,
    GetMenuDetail:Host+'/api/services/app/frontWeb/GetMenuDetail',//获取上级meun
    tokens:Host+'/oauth/token',//认证
    files:Host+'/api/file',//上传
    auth:Host+'/api/wechat/authcode?url=',
    GetTopMenu:Host+'/api/services/app/frontWeb/GetMenu',//获取顶部菜单(type:0-菜单，1-文章，2-链接，3-表单)
//  GetChildMenu:Host+'/api/services/app/frontWeb/GetChildMenu',//获取子菜单
    GetMenuArticles:Host+'/api/services/app/frontWeb/GetMenuArticles',//获取菜单下的文章列表
    GetArticle:Host+'/api/services/app/frontWeb/GetArticle',//获取文章详情
    GetTopMostCategory:Host+'/api/services/app/frontWeb/GetTopMostCategory',//获取首页置顶的文章分类
    AddLegalAid:Host+'/api/services/app/frontWeb/AddLegalAid',//在线申请法律援助
    GetAreasList:Host+'/api/services/app/xiangYangArea/GetAreasList',//获取区域列表
    AddPeopleMediation:Host+'/api/services/app/frontWeb/AddPeopleMediation',//申请人民调解
    AddOnlineQuestion:Host+'/api/services/app/frontWeb/AddOnlineQuestion',//在线法律咨询
    GetOnlineQuestions:Host+'/api/services/app/frontWeb/GetOnlineQuestions',//获取已回复在线法律咨询列表
    GetOnlineQuestion:Host+'/api/services/app/frontWeb/GetOnlineQuestion',//获取在线法律咨询详情
    GetCommonFaqs:Host+'/api/services/app/frontWeb/GetCommonFaqs',//常见问题列表
    CreateStudyRecord:Host+'/api/services/app/frontWeb/CreateStudyRecord',//提交教育学习记录
    GetStudyRecordSimpleList:Host+'/api/services/app/frontWeb/GetStudyRecordSimpleList',//查看本人提交的教育学习记录
	CreateServiceRecord:Host+'/api/services/app/frontWeb/CreateServiceRecord',//提交社区服务记录
	GetServiceRecordSimpleList:Host+'/api/services/app/frontWeb/GetServiceRecordSimpleList',//查看本人提交的社区服务记录
	CreateVisitRecord:Host+'/api/services/app/frontWeb/CreateVisitRecord',//提交走访活动记录
	GetVisitRecordSimpleList:Host+'/api/services/app/frontWeb/GetVisitRecordSimpleList',//查看本人提交的走访活动记录
	CreateReporting:Host+'/api/services/app/frontWeb/CreateReporting',//提交报告（向阳之旅）
	GetReportingSimpleList:Host+'/api/services/app/frontWeb/GetReportingSimpleList',//查看本人提交的报告记录（向阳之旅）
	GetXyNotices:Host+'/api/services/app/frontWeb/GetXyNotices',//获取向阳之旅公告列表(司法局)
	GetAreaXyNotices:Host+'/api/services/app/frontWeb/GetAreaXyNotices',//获取向阳之旅公告列表(司法所)
	GetXyNotice:Host+'/api/services/app/frontWeb/GetXyNotice',//获取详情
	GetMostArticles:Host+'/api/services/app/frontWeb/GetMostArticles',//获取详情
	GetTopMostArticles:Host+'/api/services/app/frontWeb/GetTopMostArticles',//获取置顶的文章列表
	
	GetServiceAgencies:Host+'/api/services/app/frontWeb/GetServiceAgencies',//获取公共服务机构
	GetDistricts:Host+'/api/services/app/frontWeb/GetDistricts',//获取区域列表

	authenticate:Host+'/api/account/authenticate',//登录获取token
	GetStudyRecord:Host+'/api/services/app/frontWeb/GetStudyRecord',//获取学习详情
	GetServiceRecord:Host+'/api/services/app/frontWeb/GetServiceRecord',//获取服务记录详情
	GetVisitRecord:Host+'/api/services/app/frontWeb/GetVisitRecord',//获取走访记录详情
	
	GetPeopleMediations:Host+'/api/services/app/frontWeb/GetPeopleMediations',//获取人民调解列表
	GetPeopleMediation:Host+'/api/services/app/frontWeb/GetPeopleMediation',//获取人民调解详情
	GetAssignUsers:Host+'/api/services/app/frontWeb/GetAssignUsers',//获取指派人员
	GetSelectionDatasByType:Host+'/api/services/app/frontWeb/GetSelectionDatasByType',//获取下拉列表数据（type:0-人群类别,1-家庭收入,2-申请事由,3-身份类别)
	
	GetLegalAids:Host+'/api/services/app/frontWeb/GetLegalAids',//获取人民调援助列表
	PostPeopleMediation:Host+'/api/services/app/frontWeb/PostPeopleMediation',//安排调解
	Action:Host+'/api/services/app/frontWeb/Action',//处理接口
	GetLegalAid:Host+'/api/services/app/frontWeb/GetLegalAid',//获取人民调援助详情

	ViewPeopleMediation:Host+'/api/services/app/frontWeb/ViewPeopleMediation',//查看人民调解详情
	ViewLegalAid:Host+'/api/services/app/frontWeb/ViewLegalAid',//查看人民调解详情
	Evaluate:Host+'/api/services/app/frontWeb/Evaluate',//查看人民调解详情
	acctoken:Host+'/api/account/token',//查看人民调解详情

	GetServiceAgencyMembers:Host+'/api/services/app/frontWeb/GetServiceAgencyMembers',//获取列表
	GetServiceAgency:Host+'/api/services/app/frontWeb/GetServiceAgency',//获取机构列表
	GetServiceAgencyMember:Host+'/api/services/app/frontWeb/GetServiceAgencyMember',//获取机构人员详情列表
	CreateInfoCase:Host+'/api/services/app/frontWeb/CreateInfoCase',//上报

	OnlineQuestionAnswerEvaluate:Host+'/api/services/app/frontWeb/OnlineQuestionAnswerEvaluate',//在线法律咨询回复评价
	AddOnlineQuestionAnswer:Host+'/api/services/app/frontWeb/AddOnlineQuestionAnswer',//在线法律咨询回复
	GetReportUnit:Host+'/api/services/app/frontWeb/GetReportUnit',//根据区域获取上报单位
	GetAllLawyers:Host+'/api/services/app/frontWeb/GetAllLawyers',//根据律师列表
}