<template>
	<view class="container">
		<view class="wineImage">
			<image :src="img"></image>
		</view>
		
		
		<view class="wineInfo">
			<uni-list>
				<uni-list-item :showArrow="false">
					<div class="listRow">{{degree}}% vol {{volume}} {{wineType}} ({{norm}})</div>
				</uni-list-item>
			
				<uni-list-item :showArrow="false">
					<div class="listRow">
						<div class="leftPart">
							<span class="spanTop">{{volume}}ml</span>
							<span class="spanButtom">容量</span>
						</div>
						<div class="rightPart">
							<span class="spanTop">{{degree}}度</span>
							<span class="spanButtom">度数</span>
						</div>
					</div>
				</uni-list-item>
				
				<uni-list-item :showArrow="false">
					<div class="listRow">
						<div class="leftPart">
							<span class="spanTop">{{batch}}</span>
							<span class="spanButtom">生产批次</span>
						</div>
						<div class="rightPart">
							<span class="spanTop">{{createTime}}</span>
							<span class="spanButtom">生产日期</span>
						</div>
					</div>
				</uni-list-item>
				
				<uni-list-item :showArrow="false">
					<div class="listRow">
						<div class="leftPart">
							<span class="spanTop">{{wineType}}</span>
							<span class="spanButtom">品类</span>
						</div>
						<div class="rightPart">
							<span class="spanTop">{{norm}}</span>
							<span class="spanButtom">规格</span>
						</div>
					</div>
				</uni-list-item>
			</uni-list>
		</view>
		<div class="btns">
			<div><button type="primary" plain="true" class="moreInfo" @click="moreInfo">查看更多</button></div>
			<div><button type="primary" plain="true" class="verify" @click="verify">防伪校验</button></div>
		</div>
		<!-- <uni-popup ref="verify" type="center">
			<view class="progressBox">
				<progress show-info="false" stroke-width="10" :percent='{progressPercent}'></progress>
			</view>
		</uni-popup> -->
		<uni-popup ref='moreInfo' type="bottom">
			<uni-list>
				<uni-list-item class="popTitle" :showArrow="false">鉴定详情</uni-list-item>
				<uni-list-item :showArrow="false">
					<div class="popInfo">
						<div class="popLeft">累计鉴定次数</div>
						<div class="popRight">{{identifyCount}}</div>
					</div>
				</uni-list-item>
				
				<uni-list-item :showArrow="false">
					<div class="popInfo">
						<div class="popLeft">上次查询时间</div>
						<div class="popRight">{{lastSearchTime}}</div>
					</div>
				</uni-list-item>
				
				<uni-list-item :showArrow="false">
					<div class="popInfo">
						<div class="popLeft">生产班组</div>
						<div class="popRight">{{createGroup}}</div>
					</div>
				</uni-list-item>
				
				<uni-list-item class="popTitle" :showArrow="false">商品信息</uni-list-item>
				<uni-list-item :showArrow="false">
					<div class="popInfo">
						<div class="popLeft">经销商</div>
						<div class="popRight">{{agent}}</div>
					</div>
				</uni-list-item>
				
				<uni-list-item :showArrow="false">
					<div class="popInfo">
						<div class="popLeft">经销商地址</div>
						<div class="popRight">{{agentAddress}}</div>
					</div>
				</uni-list-item>
				
				<uni-list-item :showArrow="false">
					<div class="popInfo">
						<div class="popLeft">仓库名称</div>
						<div class="popRight">{{houseName}}</div>
					</div>
				</uni-list-item>
				
				<uni-list-item :showArrow="false">
					<div class="popInfo">
						<div class="popLeft">入库时间</div>
						<div class="popRight">{{putTime}}</div>
					</div>
				</uni-list-item>
				
				<uni-list-item class="popTitle" :showArrow="false">公司信息</uni-list-item>
				<uni-list-item :showArrow="false">
					<div class="popInfo">
						<div class="popLeft">公司名称</div>
						<div class="popRight">{{companyName}}</div>
					</div>
				</uni-list-item>
				
				<uni-list-item :showArrow="false">
					<div class="popInfo">
						<div class="popLeft">公司地址</div>
						<div class="popRight">{{companyAddress}}</div>
					</div>
				</uni-list-item>
				
				<uni-list-item :showArrow="false">
					<div class="popInfo">
						<div class="popLeft">公司电话</div>
						<div class="popRight">{{companyTelephone}}</div>
					</div>
				</uni-list-item>
				
				<uni-list-item :showArrow="false">
					<div class="popInfo">
						<div class="popLeft">公司网址</div>
						<div class="popRight">{{companyNet}}</div>
					</div>
				</uni-list-item>
				
				
			</uni-list>
		</uni-popup>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				number: '',
				volume: '',
				degree: '',
				batch: '',
				createTime:'',
				cTime: '', // 记录毫秒时间，以和 BC 中做对比
				wineType: '',
				norm: '',
				img: '',
				putTime: '',
				identifyCount: '',
				lastSearchTime: '',
				createGroup: '',
				agent: '',
				agentAddress: '',
				houseName: '', // 仓库名
				companyName: '',
				companyAddress: '',
				companyTelephone: '',
				companyNet: '',
				BCNumber: '',
				BCBatch: '',
				BCCreateTime: '',
				
				progressPercent: 30,
			}
		},
		onLoad(option) {
			var that = this
			console.log('maoTai:num: ', option.num);
			that.number = option.num;
			uni.request({
				url:'http://127.0.0.1:8000/api/maotai/wineInfos/',
				header: {  
				        'Content-Type': 'application/x-www-form-urlencoded'  
				    },  
				method:'POST',
				data:{'num': that.number},
				success(res) {
					// that.wineType = res.data.DBdata[0].wineType;
					var dbData = res.data.DBdata[0];
					that.number = dbData.number;
					that.volume = dbData.volume;
					that.degree = dbData.degree;
					that.batch = dbData.batch;
					that.createTime = dbData.createTime.split('T')[0];
					that.cTime = dbData.createTime.split('T')[1].split('.')[1];
					that.wineType = dbData.wineType;
					that.norm = dbData.norm;
					console.log('imgAddr:' + dbData.img.split('maoTaiTracing/')[1])
					that.img = '../../' + dbData.img.split('maoTaiTracing/')[1];
					that.putTime = dbData.putTime.split('T')[0] + ' ' + dbData.putTime.split('T')[1];
					that.identifyCount = dbData.identifyCount;
					var searchDate = dbData.lastSearchTime.split('T')[0];
					var searchTime = dbData.lastSearchTime.split('T')[1].split('.')[0];
					that.lastSearchTime = searchDate + ' ' + searchTime;
					that.createGroup = dbData.createGroup.group;
					that.agent = dbData.storeInfo.agent;
					that.agentAddress = dbData.storeInfo.agentAddr;
					that.houseName = dbData.wearHouse.houseName;
					that.companyName = dbData.companyInfo.company;
					that.companyAddress = dbData.companyInfo.address;
					that.companyTelephone = dbData.companyInfo.telephone;
					that.companyNet = dbData.companyInfo.net;
					
					var bcData = res.data.BCdata;
					that.BCNumber = bcData[0];
					that.BCBatch = bcData[1];
					that.BCCreateTime = bcData[2];
					console.log(res);
				}
			})
			
		},
		methods: {
			moreInfo(){
				this.$refs.moreInfo.open();
			},
			verify(){
				var that = this;
				uni.showLoading({
					title:'对比中...',
					success() {
						setTimeout(function () {
							uni.hideLoading();
							if (that.number == that.BCNumber && that.cTime == that.BCCreateTime.split('.')[1] && that.batch == that.BCBatch){
								uni.showModal({
								    title: '分析结果',
								    content: '信息对比无误！',
									showCancel: true,
								    success: function (res) {
								        if (res.confirm) {
								            
								        }
								    }
								});
							}
						}, 1000);
					}
				});
			}
		}
	}
</script>

<style>
	.container{
		margin: 5vw;
	}
	.container .btns{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin-top: 10%;
	}
	.container .wineInfo .listRow{
		display: flex;
		flex-direction: row;
		justify-content: center;
		font-size: 1.2em;
		line-height: 1.5em;
	}
	.container .wineInfo .listRow .leftPart,.rightPart{
		display: flex;
		flex-direction: column;
		width: 50%;
	}
	/* .container .wineInfo .listRow .leftPart, .spanButtom{
		color: #888888;
		font-size: 1em;
	} */
	.spanButtom{
		color: #888888;
		font-size: 0.8em;
	}
	.popInfo{
		display: flex;
		justify-content: space-between;
		/* flex-wrap: nowrap; */
	}
	.popTitle{
		margin-top: 2%;
		background-color: #CCE6FF;
		border-top: 0.01vw #808080 solid;
	}

</style>
