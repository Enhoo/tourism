import request from '../utils/request.js';

/**
 *  部门管理-数据分配
 * @method get
 * @return {[type]}         [description]
 */
export function getWeather(data) {
	return request({
		url: 'weather?adCode=330105&extensions=all',
		method: 'get',
	})
}

/**
 *  部门管理-数据分配
 * @method get
 * @return {[type]}         [description]
 */
export function getWeatherLive(data) {
	return request({
		url: 'weather?adCode=330105&extensions=base',
		method: 'get',
	})
}