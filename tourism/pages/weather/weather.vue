<template>
	<view class="weather">
		<view class="title">
			<view class="flex-vs">
				<view class="title__season">{{live.weather}}</view>
				<view class="title__num">{{live.temperature}}℃</view>
			</view>
			<view class="title__area">{{info.city}}</view>
			<!-- <view class="title__area">{{info.province}}{{info.city}}</view> -->
			<view class="title__extra">
				<view class="title__extra__icon"></view>湿度{{live.humidity}}<view class="title__extra__icon-forward"></view>{{live.winddirection}}风{{live.windpower}}级
			</view>
		</view>
		<view class="detail">
			<view class="detail__item" v-for="(item,index) in forecasts" :key='index'
				:style="index===0?'opacity:.9':'opacity:.5'">
				<view class="detail__item__week">{{computedWeather(index,item.week)}}</view>
				<view class="detail__item__icon" :style="{backgroundImage:computedIcon(item.dayweather)}">
				</view>
				<view class="detail__item__temperature">{{item.nighttemp}}℃ ~ {{item.daytemp}}℃</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		switchWeek
	} from 'utils/format.js'
	import {
		getWeather,
		getWeatherLive
	} from '@/apis/weather'
	import amap from 'utils/amap-wx.js';
	import {
		weatherName
	} from './map.js'

	export default {
		data() {
			return {
				forecasts: [{}, {}, {}, {}],
				info: {},
				live: {},


				// 高德天气
				amapPlugin: null,
				key: 'e984175188a1b8a7923fa65981e84654',
				addressName: '',
				weather: {
					hasData: false,
					data: []
				}
			};
		},
		computed: {
			computedWeather() {
				return function(index, week) {
					switch (index) {
						case 0:
							return '今天'
						case 1:
							return '明天'
						case 2:
							return '后天'
						case 3:
							return '周' + switchWeek(week)
						default:
							break;
					}
				}
			},
			computedIcon() {
				return (params) => {
					if (params)
						return `url(https://web-tourism.oss-cn-hangzhou.aliyuncs.com/web-tianqi/weather/${weatherName(params)}.png)`
				}
			}
		},
		methods: {
			async getWeather(adcode) {
				let info = await getWeather(
					adcode
				);
				let live = await getWeatherLive(
					adcode
				);
				this.live = live.lives[0];
				this.forecasts = info.forecasts[0].casts;
				this.info = info.forecasts[0];
			},
			getRegeo() {
				uni.showLoading({
					title: '获取信息中'
				});
				this.amapPlugin.getRegeo({
					success: (data) => {
						let info = data[0].regeocodeData.addressComponent
						this.getWeather(info.adcode)
						console.log(info)
						// this.addressName =`${info.city} ${info.district}`
						uni.hideLoading();
					},
					fail: error => {
						console.log(error)
					}
				});
			}
		},
		mounted() {
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
			this.getRegeo()
		}
	}
</script>

<style lang="scss">
	.weather {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-image: url(https://web-tourism.oss-cn-hangzhou.aliyuncs.com/web-tianqi/weather/beijingtu.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;
		// background-color: #00cccc;

		.title {
			width: 100%;
			height: 420rpx;
			display: flex;
			align-items: center;
			justify-content: start;
			flex-direction: column;
			color: #ffffff;
		}

		.title__season {
			margin-top: 220rpx;
			font-size: 64rpx;
			font-weight: 100;
			opacity: .7;
		}

		.title__num {
			font-size: 80rpx;
			font-weight: 600;
			margin: 10rpx 0;
		}

		.title__area {
			font-weight: 400;
			font-size: 32rpx;
			opacity: .7;
		}

		.title__extra {
			margin: 10rpx 0 0;
			display: flex;
			align-items: center;
			justify-content: center;
			opacity: .7;
		}

		.title__extra__icon {
			width: 44rpx;
			height: 44rpx;
			background-image: url(https://web-tourism.oss-cn-hangzhou.aliyuncs.com/web-tianqi/weather/humidity.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			margin-right: 6rpx;
		}
		
		.title__extra__icon-forward{
			opacity: .6;
			width: 44rpx;
			height: 44rpx;
			background-image: url(https://web-tourism.oss-cn-hangzhou.aliyuncs.com/web-tianqi/weather/foward.png);
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			margin-right: 6rpx;
			margin-left: 24rpx;
		}

		.detail {
			background-color: #ffffff;
			border-top-right-radius: 18rpx;
			border-top-left-radius: 18rpx;
			padding: 32rpx 0;
		}

		.detail__item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 32rpx;
			font-size: 32rpx;
			height: 84rpx;
			color: #333333;
			font-size: 300;
		}

		.detail__item__week {}

		.detail__item__icon {
			width: 88rpx;
			height: 44rpx;
			background-repeat: no-repeat;
			background-position: center;
			background-size: 44rpx;
		}

		.detail__item__temperature {}

	}
</style>
