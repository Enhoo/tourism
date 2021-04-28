import request from '../utils/request.js';

/**
 *  部门管理-数据分配
 * @method get
 * @return {[type]}         [description]
 */
export function getWeather(adCode = 330105) {
	return request({
		url: `weather?adCode=${adCode}&extensions=all`,
		method: 'get',
	})
}

/**
 *  部门管理-数据分配
 * @method get
 * @return {[type]}         [description]
 */
export function getWeatherLive(adCode = 330105) {
	return request({
		url: `weather?adCode=${adCode}&extensions=base`,
		method: 'get',
	})
}
