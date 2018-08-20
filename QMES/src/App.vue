<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route(to, from) {
      if (to.fullPath !== from.fullPath) {
        let RoutUrl=window.location.hash.substring(1,window.location.hash.length)
        let MenuList=JSON.parse(sessionStorage.menuList)
        let state=false;
        if(RoutUrl.indexOf('index')=== -1 && RoutUrl.indexOf('report1')=== -1  && RoutUrl.indexOf('dayWages')=== -1 && RoutUrl.indexOf('SalaryItemData')=== -1 && RoutUrl.indexOf('SalaryItemDetail')=== -1){
          for(let i=0;i<MenuList.length;i++){
            for(let j=0;j<MenuList[i].Menu.length;j++){
              if(RoutUrl==MenuList[i].Menu[j].RoutUrl){
                state=true;
              }
            }
          }
        }else{
          state=true;
        }
        
        if(!state){
          this.$router.push({
            path: '/404'
          })
        }
      }
    }
  },
}
</script>

<style>
body, dd, div, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, input, li, ol, p, pre, select, td, textarea, th, ul,a {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
}
html,body{
	min-width: 1200px;
	height: 100%;
}
#app {
	background-color: #f5f7fa;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #656565;
  font-size: 14px;
  line-height: 1.52857;
  height: 100%;
}
.fl {
  float: left;
}

.fr {
  float: right;
}

.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1;
}
.el-input__inner {
    padding: 0 5px!important;
    height: 30px!important;
    line-height: 30px;
}
.tiems{
	width: 100% !important;
}
.tied .el-input__inner{
	padding:0px 30px!important;
}
.tiems .el-input__inner{
	padding:0px 30px!important;
}
.tied .el-input__icon{
	line-height: 30px !important;
}
.el-select {
    height: 30px!important;
    line-height: 30px!important;
}
.months .el-input__inner{
		padding-left: 30px !important;
}
.el-button--primary {
    padding: 7px 15px!important;
    background-color: #23b7e5;
    border-color: #23b7e5 !important;
}
.el-button--success{
	padding: 7px 15px!important;
}
.el-button--primary:focus, .el-button--primary:hover{
	color: #fff;
    background-color: #1aacda !important;
    border-color: #179ac3 !important;
}
	.pages {
  margin: 20px 0;
  width: 100%;
  text-align: center;
}
.el-form-item {
    margin-bottom: 5px!important;
}
.el-dialog__body{
	padding-bottom:10px ;
	padding-top: 10px;
}
.el-button--small, .el-button--small.is-round {
    padding: 7px 15px;
}
	.se.el-select{
		width: 100% !important;
	}
	.el-dropdown{
		display:inline;
	}
.title {
		margin: -20px;
		margin-bottom: 20px;
		padding: 20px;
		font-size: 24px;
		line-height: 1.1;
		color: #929292;
		font-weight: normal;
		background-color: #fafbfc;
		border-bottom: 1px solid #cfdbe2;
	}
	
	.title .h2 {
		font-size: 16px;
	}
	
	.tables {
		padding: 15px 15px;
		margin-bottom: 21px;
		background-color: #fff;
		border: 1px solid transparent;
		border-radius: 4px;
		border-top-width: 3px;
		border-color: #cfdbe2;
		-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
	}
	
	
	
	.inBook{
		display: inline-block;
	}
	.inBook1 .el-cascader{
		line-height: 30px;
	}
	.inBook1{
		float: left;
	}
	.span1{
		padding: 0 15px;
	}
	.span2{
		width: 80px;
		text-align: center;
		display: inline-block;
	}
	.inBook .el-select>.el-input{
		width: 220px;
	}
	.inBook2{
		display: inline-block;
	}
	.inBook4{
		float: left;
		margin-left: 20px;
	}
	.span3{
		width: 80px;
		text-align: center;
		display: inline-block;
	}
	.dataMonth{
		width: calc(100% - 161px) !important;
	}
	.cascader{
		width: calc(100% - 85px);
	}
	@media screen and (max-width: 1790px) {
		.inBook1{
			display: block;
	    width: 24%;
	    margin-right: 1.3%;
	    margin-bottom: 15px;
	    float: left;
		}
		.inBook1:nth-of-type(4){
			margin-right: 0;
		}
		.inBook1 .el-cascader{
			width: calc(100% - 85px);
		}
		.inBook1 .el-select{
			width: calc(100% - 85px);
		}
		.inBook1 .months{
			width: calc(100% - 85px) !important;
		}
		.inBook4{
			float: right;
			margin-bottom: 15px;
		}
	}
	.inBook1 .months1 .el-input__inner{
		padding-left: 30px !important;
	}
	@media screen and (max-width: 1535px) {
		.inBook1 .yuefen{
			width: calc(100% - 64px);
		}
		.inBook2{
			width: 33%;
    	text-align:left;
    	margin-bottom: 20px;
    }
    .inBook2 .el-select {
	    width: calc(100% - 108px);
	    height: 30px!important;
	    line-height: 30px!important;
		}
		.inBook2.yd .el-select {
	    width: calc(100% - 142px);
	    height: 30px!important;
	    line-height: 30px!important;
		}
	}
	@media screen and (max-width: 1605px) {
    .span2{
    	display: inline-block;
    	width: 60px;
    	padding: 0;
    	text-align: left;
    	text-align: center;
    }
    .inBook{
    	width: 33%;
    	text-align:left;
    	margin-bottom: 20px;
    }
    .inBook .el-select {
    width: calc(100% - 108px);
    height: 30px!important;
    line-height: 30px!important;
		}
		.inBook .el-date-editor.el-input, .el-date-editor.el-input__inner{
			 width: calc(100% - 90px);
		}
		.inBook .el-select>.el-input {
		    width: 100%;
		}
    /*.inBook1{
    	display: block;
    	width: 25%;
    	margin-bottom: 15px;
    	float: left;
    }*/
    .inBook1 .el-select{
    	width: calc(100% - 64px);
    }
}
@media screen and (max-width: 1280px) {
    .span2{
    	display: inline-block;
    	width: 60px;
    	padding: 0;
    	text-align: left;
    	text-align: center;
    }
    .inBook1 .months1 {
		    width: calc(100% - 64px) !important;
		}
    .inBook1{
    	display: block;
    	width: 50%;
    	margin-bottom: 15px;
    	float: left;
    	margin-right: 0;
    }
    .inBook1:nth-child(4){
    	text-align: left;
    }
    .inBook1 .el-select{
    	width: calc(100% - 64px);
    }
}
	@media screen and (max-width: 1418px) {
    .span1{
    	display: inline-block;
    	width: 75px;
    	padding: 0;
    	text-align: left;
    	text-align: center;
    }
    .inBook .el-select {
	    width: calc(100% - 79px); 
	    height: 30px!important;
	    line-height: 30px!important;
		}
		.inBook .el-date-editor.el-input, .el-date-editor.el-input__inner{
			 width: calc(100% - 79px);
		}
    .inBook{
    	display: block;
    	width: 33.33%;
    	margin-bottom: 15px;
    	float: left;
    }
    .zy{
    	text-align: right;
    }
}
@media screen and (max-width: 1370px) {
    .gnag{
    	width: 100%;
    	float:initial;
    	margin-bottom: 15px;
    }
    .gnag>div:nth-of-type(2){
    	float: right;
    }
}
.el-dropdown-menu__item{
	padding: 0 15px;
}
.el-dialog{
	position: relative;
	left: 50%;
	top:50%;
	transform: translate(-50%,-50%);
	margin: 0 !important;
}
.el-select.selects{
	width: 100%;
}
.inBook3{
	display: inline-block;
  width: 33%;
  text-align: left
}
.inBook3 .el-select {
    width: calc(100% - 79px);
    height: 30px!important;
    line-height: 30px!important;
}
@media screen and (max-width: 1480px) {
.inBook3{
	display:block;
  width: 50%;
  text-align: left;
  float: left;
  margin-bottom: 15px;
}
	.inBook3 .el-select {
    width: calc(100% - 66px);
    height: 30px!important;
    line-height: 30px!important;
	}
}
@media screen and (max-width: 1480px) {
	.inBook3 .el-select {
    width: calc(100% - 79px);
    height: 30px!important;
    line-height: 30px!important;
	}
}
.hsyd.el-date-editor{
	width: 100% !important;
}
.el-cascader.zzjg{
	width: 100%;
}
.el-select.zy{
	width: 100%;
}
.ywgzSelect{
	min-height: 30px !important;
	height: auto !important;
}
.buttons .el-button--small, .el-button--small.is-round{
	padding: 7px 13px;
}
.wenjian.uploads .el-upload{
	  width: 100%!important;
    height: auto;
}

</style>
