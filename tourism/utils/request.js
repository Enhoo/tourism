import {
	getToken,
	removeToken
} from '@/utils/auth.js'

function apiRequest(obj) {
	return new Promise((resolve, reject) => {
		const baseUrl = 'https://www.lttq7.cn/';

		let method = obj.method || "GET",
			url = baseUrl + obj.url || "",
			data = obj.data || {},
			header = {
				'Content-Type': 'application/json',
				'token': getToken() || ''
			},
			success = obj.success, //成功回调
			fail = obj.fail; //表示失败后，要执行的回调函数

		if (obj.header) {
			for (let i in obj.header) {
				header[i] = obj.header[i]
			}
		}
		uni.showLoading({
			mask: true,
			title:'加载中...'
		})
		uni.request({
			url: url,
			data: data,
			method: method,
			header: header,
			success: ((Response) => {
				//resolve(res)
				let res = Response.data;
				switch (Number(res.code)) {
					case 200:
						//成功返回
						resolve(res.data)
						break;
					default:
						// 错误处理
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						break;
				}
				uni.hideLoading()
			}),
			fail: ((err) => {
				console.log(err)
				reject(err)
				uni.hideLoading()
				uni.showModal({
					content: '网络超时/异常',
					showCancel: false
				})
			})
		})
	})
}
export default apiRequest
