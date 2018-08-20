//const Host='http://quickcq.com:1046/'
export default {
  hostname: Host, //把主机名公布出去
	template:templates,
  //获取菜单
  getmenu:Host+'api/auth/getmenu',//获取用户菜单
  addrole:Host+'api/auth/addrole',//新建角色
  delrole:Host+'api/auth/delrole',//删除角色
  getrole:Host+'api/auth/getrole',//获取用户角色
  getauth:Host+'api/auth/getauth',//获取角色权限
  setrole:Host+'api/auth/setrole',//设置用户角色
  setauth:Host+'api/auth/setauth',//设置角色权限
  //登录
  signin:Host+'api/auth/signin',//用户登录
  //上传文件
  files:Host+'api/file/post',//文件上传
  //用户管理
  userlist:Host+'api/auth/userlist',//获取用户列表
  newuser:Host+'api/auth/newuser',//新建用户
  edituser:Host+'api/auth/edituser',//修改用户
  setprofile:Host+'api/auth/setprofile',//设置用户信息
  resetpwd:Host+'api/auth/resetpwd',//重置密码
  deluser:Host+'api/auth/deluser',//删除用户
  changepwd:Host+'api/auth/changepwd',//修改密码
  exituser:Host+'api/auth/exituser',//用户注销
  checkuser:Host+'api/auth/checkuser',//第一次进入修改密码
  
  //词典管理
  dictgetlist:Host+'api/dict/getlist',//获取词典列表
  dictaddnew:Host+'api/dict/addnew',//新建词典
  dictSelector:Host+'api/dict/Selector',//词典选择器
  dictgetmodel:Host+'api/dict/getmodel',//获取词典模型
  editdict:Host+'api/dict/editdict',//修改词典
  deldict:Host+'api/dict/deldict',//删除词典
  //组织架构
  orgetlist:Host+'api/org/getlist',//获取组织列表
  editorg:Host+'api/org/editorg',//修改组织架构
  delorg:Host+'api/org/delorg',//删除组织架构
  orgaddnew:Host+'api/org/addnew',//新建组织架构
  //电子卡
  cardList:Host+'api/card/getlist',//获取电子卡列表
  cardset:Host+'api/card/cardset',//电子卡业务配置
  stateset:Host+'api/card/stateset',//电子卡状态管理
  clearset:Host+'api/card/clearset',//电子卡清除业务
  cardselector:Host+'api/card/cardselector',//电子卡选择器
  syncard:Host+'api/card/syncard',//电子卡与平台同步
  cardedit:Host+'api/card/cardedit',//电子卡与平台同步
  //桌台管理
  getempglist:Host+'api/empg/getempglist',//获取桌台列表
  getdetails:Host+'api/empg/getdetails',//获取桌台明细列表
  empgselector:Host+'api/empg/empgselector',//桌台选择器
  editempg:Host+'api/empg/editempg',//修改桌台
  deldetail:Host+'api/empg/deldetail',//删除指定id桌台明细
  delempg:Host+'api/empg/delempg',//删除指定桌台
  adddetail:Host+'api/empg/adddetail',//新建桌台明细
  addnew:Host+'api/empg/addnew',//新建桌台
  editempgde:Host+'api/empg/editempgde',//修改占比
  //班次规格
  addshift:Host+'api/sspec/addshift',//新建班次
  addspec:Host+'api/sspec/addspec',//新建规格
  clearset1:Host+'api/sspec/clearset',//清除规格业务配置
  delshift:Host+'api/sspec/delshift',//删除指定ID的班次
  delsepc:Host+'api/sspec/delsepc',//删除指ID的规格
  editshift:Host+'api/sspec/editshift',//修改班次
  editsepc:Host+'api/sspec/editsepc',//修改规格
  getshiftlist:Host+'api/sspec/getshiftlist',//获取班次列表
  getsepclist:Host+'api/sspec/getsepclist',//获取规格列表
  shiftselector:Host+'api/sspec/shiftselector',//班次选择器
  shiftstate:Host+'api/sspec/shiftstate',//班次状态管理
  sepcselector:Host+'api/sspec/sepcselector',//规格选择器
  specsetcard:Host+'api/sspec/specsetcard',//规格业务配置
  sepcsetstate:Host+'api/sspec/sepcsetstate',//规格状态管理
  //工艺管理
  addproce:Host+'api/proce/addproce',//新建工艺
  addrule:Host+'api/proce/addrule',//新建工艺规则
  delproce:Host+'api/proce/delproce',//删除工艺
  delrule:Host+'api/proce/delrule',//删除工艺规则
  editproce:Host+'api/proce/editproce',//修改工艺
  editrule:Host+'api/proce/editrule',//修改工艺规则
  procelist:Host+'api/proce/procelist',//工艺列表
  rulelist:Host+'api/proce/rulelist',//工艺规则列表
  ruleselector:Host+'api/proce/ruleselector',//业务规则选择器
  rulesetstate:Host+'api/proce/rulesetstate',//规则状态管理
  proceselector:Host+'api/proce/proceselector',//工艺选择器
  procesetstate:Host+'api/proce/procesetstate',//工艺zhuantai 
  
  //报表
  getrepmenu:Host+'api/report/getrepmenu',//报表
  getreport:Host+'api/report/getreport',//报表
  execreport:Host+'api/report/execreport',//执行报表
  
  //设备
  syndev:Host+'api/dev/syndev',//设备
  editdevi:Host+'api/dev/editdevi',//修改设备
  setgetlist:Host+'api/dev/getlist',//设备列表
  getlistlog1:Host+'api/dev/getlistlog',//设备日志
  getlistsou:Host+'api/dev/getlistsou',//获取设备源数据列表
  getlistdata:Host+'api/dev/getlistdata',//获取设备源数据明细
  selectDev:Host+'api/dev/server',//设备选择器
  devicesetrule:Host+'api/dev/devicesetrule',//设置设备的业务规则
	getdevicerule:Host+'api/dev/getdevicerule',//获取设备的业务规则
	dellog:Host+'api/dev/dellog',//	删除指定日期范围的日志
	dellogs:Host+'api/dev/dellog',//	删除指定ID的日志
	dellogall:Host+'api/dev/dellogall',//	删除所有的日志
	delbylog:Host+'api/dev/delbylog',//删除指定设备的日志
	statesets:Host+'api/dev/statesets',//修改状态
	
  //职员管理
  Empaddnew:Host+'api/emp/addnew',//新建职员	
	Empdelitem:Host+'api/emp/delitem',//离职
	Empedititem:Host+'api/emp/edititem',//	修改职员
	Empgetlist:Host+'api/emp/getlist',//	获取职员列表
	empctorselector:Host+'api/emp/empctor',//	员工选择器
	getlistid:Host+'api/emp/getlistid',//	员工id选择器
	Aditem:Host+'api/emp/Aditem',//	员工id选择器
	
	//工资项和工资方案
	Itemaddnew:Host+'api/item/addnew',//新建工资项目
	Itemdelitem:Host+'api/item/delitem',//状态更改
	Itemedititem:Host+'api/item/edititem',//	修改工资项目
	itemser:Host+'api/item/itemser',//	工资项目选择器
	Itemgetlist:Host+'api/item/getlist',//	获取工资项目列表
	Itemaddsolution:Host+'api/item/addsolution',//新建工资方案
	Itemdelsolution:Host+'api/item/delsolution',//	状态更改
	Itemeditsolution:Host+'api/item/editsolution',//	修改工资方案
	Itemgetlistsous:Host+'api/item/getlistsous',//	获取工资方案列表
	upsolutionitem:Host+'api/item/upsolutionitem',//	保存工资方案定义
	Itemeditsolutionitem:Host+'api/item/editsolutionitem',//编辑工资方案定义
	Itemgetlistsousitem:Host+'api/item/getlistsousitem',//获取工资方案定义列表
	solutionctor:Host+'api/item/solutionctor',//工资方案选择器
	addsolutionitem:Host+'api/item/addsolutionitem',//工资方案选择器
	solutitemlist:Host+'api/item/solutitemlist',//工资方案定义公式编辑页面
	solut:Host+'api/item/solut',//工资方案定义工资项选择器
	salarycalc:Host+'api/item/salarycalc',//	计算工资
	getsalarymaster:Host+'api/item/getsalarymaster',//	获取工资主表列表
	getsalaryitemlist:Host+'api/item/getsalaryitemlist',//	获取工资明细项列表
	getsalaryrulelist:Host+'api/item/getsalaryrulelist',//	获取计量明细项列表
	salaryvierfy:Host+'api/item/salaryvierfy',//工资表审核
	cancelverify:Host+'api/item/cancelverify',//工资表审核取消审核
	salaryover:Host+'api/item/salaryover',//工资发放
	itemsers:Host+'api/item/itemser',//工资发放
	delsouslt:Host+'api/item/delsouslt',//删除工资定义
	daysalarycalculate:Host+'api/item/daysalarycalculate',//计算日工资
	sourceadd:Host+'api/item/sourceadd',//	工资项源数据新建
	sourceedit:Host+'api/item/sourceedit',//	修改工资项源数据
	getsource:Host+'api/item/getsource',//	获取工资项源数据
	sourceimport:Host+'api/item/sourceimport',//	工资源数据导入
	sourcedelitem:Host+'api/item/sourcedelitem',//	删除工资源数据项
	getdaydatas:Host+'api/item/getdaysalary',//	获取日工资源列表
	getmonthsalary:Host+'api/item/getmonthsalary',//	获取月工资源列表
	
	
	daysourceadd:Host+'api/item/daysourceadd',//	日工资项源数据新建
	daysourceedit:Host+'api/item/daysourceedit',//	修改日工资项源数据
	getdaysource:Host+'api/item/getdaysource',//	获取日工资项源数据
	daysourceimport:Host+'api/item/daysourceimport',//		日工资源数据导入
	daysourcedelitem:Host+'api/item/daysourcedelitem',//删除日工资源数据项

	getlistlog: Host + 'api/Logss/getlistlog', //获取列表
	getbin: Host + 'api/auth/getbin', //获取用户列表
	delbylog1: Host + 'api/Logss/delbylog', //删除管理员日志
	dellog1: Host + 'api/Logss/dellog', //删除指定id日志
	dellsog1: Host + 'api/Logss/dellog', //删除指定范围内日志
}