export default {
  hostname: Host, //把主机名公布出去
  Template:Template,
  //用户接口
  addnew: Host + 'api/auth/addnew', //新建用户
  changepwd: Host + 'api/auth/changepwd', //修改密码
  deluser: Host + 'api/auth/deluser', //删除指定ID的用户
  getuserlist: Host + 'api/auth/getlist', //获取用户列表
  resetpwd: Host + 'api/auth/resetpwd', //重置密码
  setprofile: Host + 'api/auth/setprofile', //设置用户Profile
  edituser: Host + 'api/auth/edituser', //修改用户
  signin: Host + 'api/auth/signin', //用户登陆
  exituser: Host + 'api/auth/exituser', //用户注销

  //角色
  addrole: Host + 'api/auth/addrole', //新建角色
  delrole: Host + 'api/auth/delrole', //删除角色
  getmenu: Host + 'api/auth/getmenu', //获取操作员菜单
  getrole: Host + 'api/auth/getrole', //获取角色
  getauth: Host + 'api/auth/getauth', //获取角色权限列表
  seturole: Host + 'api/auth/seturole', //设置用户角色
  setrauth: Host + 'api/auth/setrauth', //设置角色权限



  //账套管理
  addaccount: Host + 'api/account/addnew', //新建账套
  createdb: Host + 'api/account/createdb', //创建账套的数据库
  delmodel: Host + 'api/account/delmodel', //删除指定ID的账套信息
  getmodel: Host + 'api/account/getmodel', //获取指定ID的账套信息
  getacclist: Host + 'api/account/getlist', //获取账套信息列表
  getselector: Host + 'api/account/getselector', //账套信息选择器
  setaccountinfo: Host + 'api/account/setaccountinfo', //设置账套信息
  setdbserver: Host + 'api/account/setdbserver', //设置账套配置
  setmqtt: Host + 'api/account/setmqtt', //设备账套MQTT配置
  repselector: Host + 'api/account/repselector', //设备账套MQTT配置

  //电子卡
  cardnew: Host + 'api/elecard/cardnew', //新建电子卡
  cardallot: Host + 'api/elecard/cardallot', //分配电子卡片
  cardselector: Host + 'api/elecard/cardselector', //卡片选择器
  delcard: Host + 'api/elecard/delcard', //删除指定ID的电子卡
  cardlist: Host + 'api/elecard/cardlist', //获取电子卡列表
  cardimport: Host + 'api/elecard/cardimport', //导入电子卡片
  setstate: Host + 'api/elecard/setstate', //修改电子卡片状态

  //设备
  devicenew: Host + 'api/device/devicenew', //新建设备
  deviceallot: Host + 'api/device/deviceallot', //设备分配
  selector: Host + 'api/device/selector', //设备选择器
  editdevice: Host + 'api/device/editdevice', //修改设备
  getlistdevice: Host + 'api/device/getlist', //获取设备列表
  getdevicemodel: Host + 'api/device/getmodel', //获取指定ID的设备
  devicesetstate: Host + 'api/device/setstate', //修改设备状态
  unbind: Host + 'api/device/unbind', //设备解绑

  // 报表
  colnew: Host + 'api/platrpt/colnew', //新建报表列
  paranew: Host + 'api/platrpt/paranew', //新建报表参数
  reportnew: Host + 'api/platrpt/reportnew', //新建报表
  tablenew: Host + 'api/platrpt/tablenew', //新建报表子表
  tcolnew: Host + 'api/platrpt/tcolnew', //新建子表列
  delcol: Host + 'api/platrpt/delcol', //删除指定ID的报表列
  delpara: Host + 'api/platrpt/delpara', //删除指定ID的报表参数
  delrpt: Host + 'api/platrpt/delrpt', //删除指定ID的报表
  delscope: Host + 'api/platrpt/delscope', //删除指定ID的报表作用域
  deltable: Host + 'api/platrpt/deltable', //删除指定ID的报表子表
  deltablecol: Host + 'api/platrpt/deltablecol', //删除指定ID的子表列
  editcol: Host + 'api/platrpt/editcol', //修改报表列
  editpara: Host + 'api/platrpt/editpara', //修改报表参数
  editreport: Host + 'api/platrpt/editreport', //修改报表信息
  edittable: Host + 'api/platrpt/edittable', //修改报表子表
  edittcolum: Host + 'api/platrpt/edittcolum', //修改子表列
  getcols: Host + 'api/platrpt/getcols', //获取指定报表的列列表
  getparas: Host + 'api/platrpt/getparas', //获取指定报表的参数列表
  stateset: Host + 'api/platrpt/stateset', //修改状态

  getreorts: Host + 'api/platrpt/getreorts', //获取所有报表列表
  reportselector: Host + 'api/platrpt/reportselector', //报表选择器

  gettcols: Host + 'api/platrpt/gettcols', //获取指定子表的列集合
  gettables: Host + 'api/platrpt/gettables', //获取指定报表的子表集合
  setscope: Host + 'api/platrpt/setscope', //设置报表作用域
  getscopelist: Host + 'api/platrpt/getscopelist', //获取指定ID报表作用域列表
  

  //文件上传
  files: Host + 'api/file/post', //文件上传



  checkuser: Host + 'api/auth/checkuser', //第一次进入修改密码

	getlistlog: Host + 'api/Logs/getlistlog', //获取列表
	getbin: Host + 'api/auth/getbin', //获取用户列表
	delbylog: Host + 'api/Logs/delbylog', //删除管理员日志
	dellog: Host + 'api/Logs/dellog', //删除指定id日志
	dellsog: Host + 'api/Logs/dellog', //删除指定范围内日志
}
