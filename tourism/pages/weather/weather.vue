<template>
	<view class="weather">
		<view class="title">
			<view class="title__season">{{live.weather}}</view>
			<view class="title__num">{{live.temperature}}℃</view>
			<view class="title__area">{{info.province}}{{info.city}}</view>
		</view>
		<view class="detail">
			<view class="detail__item" v-for="(item,index) in forecasts" :key='index'
				:style="index===0?'opacity:.9':'opacity:.5'">
				<view class="detail__item__week">{{computedWeather(index,item.week)}}</view>
				<view class="detail__item__icon"></view>
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
	export default {
		data() {
			return {
				forecasts: [{}, {}, {}, {}],
				info: {},
				live: {}
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
							return '周'+switchWeek(week)
						default:
							break;
					}
				}
			}
		},
		methods: {
			async weather() {
				let info = await getWeather();
				let live = await getWeatherLive();
				this.live = live.lives[0];
				this.forecasts = info.forecasts[0].casts;
				this.info = info.forecasts[0];
				console.log(live.lives[0].weather)
			}
		},
		mounted() {
			this.weather()
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
		background-color: #007AFF;

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

		.detail__item__icon {}

		.detail__item__temperature {}

	}
</style>
