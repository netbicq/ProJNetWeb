<template>
	<div class="container">
		<div class="statusbar clearfix">
			<div class="w25 back" @click="fnBack()">
				<img src="../../assets/icon/back@2x.png" alt="">
				<span>返回</span>
			</div>
			<div class="w50 topcenter">
				<span>法律法规</span>
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
		<div class="banner1" style="margin-top: 3.3rem;">
			<!--<a href="#"><img src="../../assets/statute.png" alt=""></a>-->
			<div class="row listsLink">
				<a href="http://www.12348.gov.cn/sfbMobile/app/page/news/common/list/news_list.html?title=%E6%B3%95%E5%BE%8B%E6%B3%95%E8%A7%84&type=laws&timestamp-1532937948230=1532937948230">
					<div class="fl words">
						<p>法律法规数据库</p>
						<!--<span>{{item.subTitle}}</span>-->
					</div>
					<div class="fr img">
						<img src="../../assets/icon/case@3x.png" alt="">
					</div>
				</a>
				<a href="http://zhsk.12348.gov.cn/qa.wap/?timestamp-1532938212114=1532938212114">
					<div class="fl words">
						<p>法律知识问答</p>
						<!--<span>{{item.subTitle}}</span>-->
					</div>
					<div class="fr img">
						<img src="../../assets/icon/law_ico@3x.png" alt="">
					</div>
				</a>
			</div>
		</div>
		<div class="wrap">
			<div class="content">
				<!--<div class="title">
                    <span class="title-dy">法律知识问答</span>
                </div>-->
				<div class="row">
					<!--<button>法律法规数据库</button>
                    <button>法律知识问答</button>-->

					<!--<button>合同法</button>-->
				</div>
				<!--<div class="row">
                    <button>侵权责任法</button>
                    <button>劳动合同法</button>
                    <button>消费者权益保护</button>
                </div>
                <div class="row">
                    <button>居民身份证法</button>
                    <button>道路交通安全法</button>
                    <button>治安管理处罚法</button>
                </div>
                <div class="row">
                    <button>妇女权益保障法</button>
                    <button>未成年人保护法</button>
                    <button>人民调解法</button>
                </div>
                <div class="row">
                    <button>行政许可法</button>
                    <button>食品安全法</button>
                    <button>婚姻法和集成法</button>
                </div>
                <div class="row">
                    <button>刑事诉讼法</button>
                </div>-->
			</div>
		</div>
	</div>
</template>
<script>
	import Api from "../../kites/api";
	export default {
		name: "Statute",
		data() {
			return {
				searchs: "",
				id:'',
			};
		},
		beforeCreate() {
			this.openIds()
		},
		mounted() {
			this.id = this.$route.params.id
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
					name: 'InfoQuery',
					params: {
						id: this.parentId
					}
				})
			},
			//获取上级
			GetMenuDetail() {
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
	
	.listsLink>a .words {
		width: 55%;
		height: 100%;
		display: inline-block;
		float: left;
	}
	
	.listsLink>a .words p {
		width: 100%;
		color: #333333;
		text-align: left;
		font-size: 1.25rem;
	}
	
	.listsLink>a .words span {
		display: inline-block;
		width: 100%;
		font-size: 1.25rem;
		color: #808080;
		text-align: left;
	}
	
	.listsLink>a .img {
		width: 45%;
		height: 100%;
		float: right;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.listsLink>a .img img {
		width: 70%;
		vertical-align: middle;
	}
</style>