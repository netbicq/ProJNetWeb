<template>
	<div class="container" v-loading=loging>
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>执法服务</span>
			</div>
			<div class="w25">
				<!-- <img src="../../assets/icon/back@2x.png" alt=""> -->
			</div>
		</div>
		<!-- <div class="search clearfix">
            <div class="sear_input">
                <el-input
                    size="small"
                    clearable
                    placeholder="请输入需要搜索的内容"
                    prefix-icon="el-icon-search"
                    v-model="searchs">
                </el-input>
            </div>
            <div class="btn">
                <button @click="fnSearch">搜索</button>
            </div>
            
        </div> -->
		<div class="severs" style="margin-top: 3.3rem;">
			<ul class="btnsd clearfix">
				<li v-for="(item,index) in threeNav">
					<a :href=item.url>
		        		<div class="fl words">
							<p>{{item.displayName}}</p>
							<!--<span>{{item.subTitle}}</span>-->
						</div>
						<div class="fr img">
							<img src="../../assets/icon/case@3x.png" alt="">
						</div>
	                </a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	export default {
		name: "Services",
		data() {
			return {
				searchs: "",
				threeNav: [],
				loging:false
			};
		},
		beforeCreate() {
			this.openIds()
		},
		mounted() {
			this.id = this.$route.params.id
			this.infothrnav()
			this.GetMenuDetail()
		},
		methods: {
			//搜索
			fnSearch() {
				alert(this.searchs);
			},
			//返回上一页
			fnBack() {
				 this.$router.push({
		          name: 'LegalService',
		          params: {
		            id: this.parentId
		          }
		        })
			},
			//获取上级
			GetMenuDetail(){
				this.$post(Api.GetMenuDetail, {
					'id': this.id
				}).then(res => {
					console.log(res)
					if(res.data.success == true) {
						this.titles = res.data.result.displayName
						this.parentId = res.data.result.parentId
					} else {
						this.loading = false
						this.$message.error(res.data.error);
					}
				})
			},
			infothrnav() {
				this.loging = true
				this.$post(Api.GetTopMenu, {
					'parentId': this.id
				}).then(res => {
					console.log(res)
					if(res.status == 200) {
						this.loging = false
						this.threeNav = res.data.result
					} else {
						this.loging = false
						this.$message.error(res.data.error);
					}
				})
			},
		}
	};
</script>
<style scoped>
	.wrap {
		padding-bottom: .8rem !important;
	}
	
	.wrap .content {
		background-color: transparent;
	}
	
	.title-dy {
		width: 100%;
		font-size: 1.3rem;
		font-weight: 600;
		display: inline-block;
		text-align: left;
		color: #38589f;
		padding: .8rem 0;
	}
	
	.banner1 {
		width: 100%;
		box-sizing: border-box;
		padding: .8rem;
	}
	
	.banner1 img {
		width: 100%;
	}
	
	.content .row {
		display: flex;
		justify-content: space-between;
	}
	
	.content .row button {
		width: 9.25rem;
		float: left;
		outline: none;
		border: none;
		color: #595757;
		font-size: 1.1rem;
		border-radius: .4rem;
		padding: .4rem .8rem;
		margin: .4rem;
		background-color: #e1e6f1;
	}
	
	.listsLink a {
		display: inline-block;
		width: 49%;
		margin-top: 0.4rem;
		padding: 1.2rem;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		background-color: #ffffff;
		color: #808080;
		font-size: 14px;
	}
	.severs{
		/*padding: .5rem;*/
	}
	.btnsd{
	}
	.btnsd li {
		display: inline-block;
		width: 49%;
		margin-top: 0.4rem;
		padding: 1.2rem;
		float: left;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		background-color: #ffffff;
		border-radius: 10px;
	}
	.btnsd li:nth-of-type(2){
		float: right;
	}
	.btnsd li a {
		color: #808080;
    	font-size: 14px;
	}
	.btnsd li>a .words {
		width: 55%;
		height: 100%;
		display: inline-block;
		float: left;
	}
	
	.btnsd li>a .words p {
		width: 100%;
		color: #333333;
		text-align: left;
		font-size: 1.25rem;
	}
	
	.btnsd li>a  .words span {
		display: inline-block;
		width: 100%;
		font-size: 1.25rem;
		color: #808080;
		text-align: left;
	}
	
	.btnsd li>a  .img {
		width: 45%;
		height: 100%;
		float: right;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.btnsd li>a  .img img {
		width: 70%;
		vertical-align: middle;
	}
</style>