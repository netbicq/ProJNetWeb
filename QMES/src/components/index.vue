<template>
	<div>
		<div class="Legend">
			<ul>
				<li style="background:#2f80e7;">
				</li>
				<li style="background:#564aa3;">
				</li>
				<li style="background:#2b957a;">
				</li>
			</ul>
		</div>
		<div class="echar clearfix">
			<div class="left clearfix">
				<div id="bar" class="bar fl"></div>
				<div id="cir" class="cir fr"></div>
			</div>
			<div class="right">
				<span>最新设备日志</span>
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="cNum" label="设备ID">
					</el-table-column>
					<el-table-column prop="cardType" label="设备名称">
					</el-table-column>
					<el-table-column prop="cName" label="设备编号">
					</el-table-column>
					<el-table-column prop="cName" label="时间">
					</el-table-column>
					<el-table-column prop="State" label="日志内容">
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>
<script>
	// 引入 ECharts 主模块
	const echarts = require("echarts/lib/echarts");
	// 引入柱状图
	require("echarts/lib/chart/bar");
	// 引入饼图
	require("echarts/lib/chart/pie");
	// 引入提示框和标题组件
	require("echarts/lib/component/tooltip");
	require("echarts/lib/component/title");
	export default {
		name: "index",
		data() {
			return {
				region: [],
				proValue: "",
				options: [],
				regions: [],
				tableData: [{
					cNum: 10012,
					cardType: '员工卡',
					cName: '张三',
					State: '正常'
				}, {
					cNum: 10012,
					cardType: '员工卡',
					cName: '张三',
					State: '正常'
				}], //卡片列表
			};
		},
		mounted() {
			this.fnPie()
			this.drawLine();
		},
		methods: {
			fnPie() {
      var myCir = echarts.init(document.getElementById("cir"));
      myCir.setOption({
        title: {
          text: "月度工艺产量占比饼图",
          x: "center",
          y:15
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}万元 ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "精品",
            "高端",
            "中低端",
            "塑胶",
          ]
        },
        series: [
          {
            name: "月度工艺产量占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: (393351 / 10000).toFixed(2), name: "精品" },
              { value: (294102 / 10000).toFixed(2), name: "高端" },
              { value: (252313 / 10000).toFixed(2), name: "中低端" },
              { value: (245214 / 10000).toFixed(2), name: "塑胶" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
			drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('bar'))
      // 绘制图表
      myChart.setOption({
        title: { text: '月度产最走趋图',x: "center",
          y:15},
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
	        
	 
        }],
        color:'#6ca8e3'    
      });
    }
			
		}
	};
</script>
<style scoped>
	.Legend {
		width: 100%;
		/*min-width: 1193px;*/
	}
	
	.Legend ul {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 20px 0;
	}
	
	.Legend ul li {
		width: 32%;
		height: 94px;
		/* padding: 5px; */
		box-sizing: border-box;
		border-radius: 5px;
		color: #ffffff;
	}
	
	.echar .bar {
		width: 59%;
		height: 500px;
		box-sizing: border-box;
		border-radius: 5px;
		border: 1px solid #d1dce3;
		border-top: 3px solid #d1dce3;
		background: #fff;
	}
	
	.echar .cir {
		background: #fff;
		width: 39%;
		height: 500px;
		box-sizing: border-box;
		border-radius: 5px;
		border: 1px solid #d1dce3;
		border-top: 3px solid #d1dce3;
		/* margin-right: 1%; */
		
	}
	.echar .right {
		
		background: #fff;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #d1dce3;
  border-top: 3px solid #d1dce3;
  margin-top: 20px;
  padding-bottom: 20px;
}
	.echar .right span {
		width: 100%;
		display: inline-block;
		text-align: center;
		font-weight: 600;
		font-size: 20px;
		padding-bottom: 10px;
		margin-top: 20px;
	}
</style>