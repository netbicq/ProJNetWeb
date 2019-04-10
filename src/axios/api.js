//const Host='http://quickcq.com:1046/'
export default {
	Hostname: Host, //把主机名公布出去
	signin:Host+'/api/auth/signin',//登入
  //业主单位
	news:Host+'/api/owner/new',//新建 业主
	del:Host+'/api/owner/del',//删除业主单位
	edit:Host+'/api/owner/edit',//修改业主单位
	ownergetlist:Host+'/api/owner/getlist',//获取业主单位列表
	Selector:Host+'/api/owner/Selector',//业主单位选择器
	
	//管理员
	userlist:Host+'/api/auth/userlist',//获取管理员列表
	newuser:Host+'/api/auth/newuser',//新建管理员
	deluser:Host+'/api/auth/deluser',//删除管理员
	edituser:Host+'/api/auth/edituser',//修改管理员
	resetpwd:Host+'/api/auth/resetpwd',//重置密码
	addrole:Host+'/api/auth/addrole',//新建角色
	getrole:Host+'/api/auth/getrole',//获取用户角色
	exituser:Host+'/api/auth/exituser',//注销
	setprofile:Host+'/api/auth/setprofile',//设置用户Profile
	getauth:Host+'/api/auth/getauth',//获取角色权限
	setauth:Host+'/api/auth/setauth',//设置角色权限
	setrole:Host+'/api/auth/setrole',//设置用户角色
	getmenu:Host+'/api/auth/getmenu',//设置用户角色
	delrole:Host+'/api/auth/delrole',//删除角色
	changepwd:Host+'/api/auth/changepwd',//修改密码
	//文件上传
	files:Host+'/api/file/post',//文件上传
	
	//词典
	addnew:Host+'/api/dict/addnew',//新建词典
	deldict:Host+'/api/dict/deldict',//删除指定ID的词典
	editdict:Host+'/api/dict/editdict',//修改词典
	dicgetlist:Host+'/api/dict/getlist',//获取词典列表
	dicSelector:Host+'/api/dict/Selector',//词典选择器
	
	//项目
	progetlist:Host+'/api/proj/getlist',//获取列表
	proaddnew:Host+'/api/proj/addprob',//新建项目
	conedit:Host+'/api/proj/conedit',//修改联系人
	addiss:Host+'/api/proj/addiss',//问题发布
	editsch:Host+'/api/proj/editsch',//修改进度计划
	editiss:Host+'/api/proj/editiss',//修改问题
	deliss:Host+'/api/proj/deliss',//删除问题
	editprojs:Host+'/api/proj/editprojs',//修改基本信息
	editafter:Host+'/api/proj/editafter',//后续计划修改
	stateset:Host+'/api/proj/stateset',//状态管理
	editschedule:Host+'/api/proj/editschedule',//执行计划修改
  openproj:Host+'/api/proj/openproj',//项目取消开工

	
	reguser:Host+'/api/auth/reguser',//用户注册
	yamm:Host+'/api/auth/yamm',//用户注册
	getdata:Host+'/api/report/getdata',//获取报表数据
	basAddnew:Host+'/api/bap/addnew',//	新建标准
	basDelbap:Host+'/api/bap/delbap',//	删除指定ID的标准
	basEditbap:Host+'/api/bap/editbap',//		修改标准
	basGetlist:Host+'/api/bap/getlist',//	获取标准列表
	getlistq:Host+'/api/proj/getlistq',//	获取节点
	editschq:Host+'/api/proj/editschq',//	新增节点计划
	editissq:Host+'/api/proj/editissq',//	修改节点计划
	addschqe:Host+'/api/proj/addschqe',//	新增节点执行
	editissqb:Host+'/api/proj/editissqb',//	修改节点执行
	deletepro:Host+'/api/proj/deletepro',//	删除
	
	addnewTeam:Host+'/api/team/addnew',//	新建协调工作
	delTeam:Host+'/api/team/delteam',//		删除指定ID的
	getlistTeam:Host+'/api/team/getlist',//		获取协调工作列表
	getlistqMsggse:Host+'/api/proj/getlistq',//获取是否发送短信节点
	editsmss:Host+'/api/proj/editsmss',//
	allsend:Host+'/api/owner/allsend',//
	editweb:Host+'/api/report/editweb',//
}
