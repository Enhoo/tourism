/**
 * Created by PanJiaChen on 16/11/18.
 */


/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
	if (arguments.length === 0) {
		return null
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
		const value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		return value.toString().padStart(2, '0')
	})
	return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
	if (('' + time).length === 10) {
		time = parseInt(time) * 1000
	} else {
		time = +time
	}
	const d = new Date(time)
	const now = Date.now()

	const diff = (now - d) / 1000

	if (diff < 30) {
		return '刚刚'
	} else if (diff < 3600) {
		// less 1 hour
		return Math.ceil(diff / 60) + '分钟前'
	} else if (diff < 3600 * 24) {
		return Math.ceil(diff / 3600) + '小时前'
	} else if (diff < 3600 * 24 * 2) {
		return '1天前'
	}
	if (option) {
		return parseTime(time, option)
	} else {
		return (
			d.getMonth() +
			1 +
			'月' +
			d.getDate() +
			'日' +
			d.getHours() +
			'时' +
			d.getMinutes() +
			'分'
		)
	}
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
	const search = url.split('?')[1]
	if (!search) {
		return {}
	}
	return JSON.parse(
		'{"' +
		decodeURIComponent(search)
		.replace(/"/g, '\\"')
		.replace(/&/g, '","')
		.replace(/=/g, '":"')
		.replace(/\+/g, ' ') +
		'"}'
	)
}

/**
 * @param {number} type 0.yyyy-MM-dd HH:mm:ss 1.yyyy-MM-dd 2.HH:mm:ss 3.HH:mm 
 * @param {date} date
 * 
 * @returns {string}
 */
//时间戳转换方法    date:时间戳数字
export function formatDate(date, type = 0) {
	var date = new Date(date);
	var YY = date.getFullYear();
	var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
	var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
	var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
	var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
	var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	switch (type) {
		case 0:
			return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
		case 1:
			return `${YY}-${MM}-${DD}`; //单纯日期
		case 2:
			return `${hh}:${mm}:${ss}`; //单纯时间
		case 3:
			return `${hh}:${mm}`; //单纯时间
		default:
			return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
	}
}


/**
 * 
 * type函数
 * 
 * @param {object} obj
 * 
 * @returns {string}
 */
export function getType(obj) {
	//tostring会返回对应不同的标签的构造函数
	var toString = Object.prototype.toString;
	var map = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object'
	};
	if (obj instanceof Element) {
		return 'element';
	}
	return map[toString.call(obj)];
}

/**
 * 
 * 日期推出星期
 * 
 * @param {object} sDate
 * 
 * @returns {string}
 */
export function getWeekday(sDate) {
	var dt = new Date(sDate.replace(/-/g, '/'));
	var a = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	return dt.getDay();
}

/**
 * 
 * 深拷贝(deepClone)
 * 
 * @param {object} data
 * @param {date} date
 * 
 * @returns {string}
 */
export function deepClone(data) {
	var type = getType(data);
	var obj;
	if (type === 'array') {
		obj = [];
	} else if (type === 'object') {
		obj = {};
	} else {
		//不再具有下一层次
		return data;
	}
	if (type === 'array') {
		for (var i = 0, len = data.length; i < len; i++) {
			obj.push(deepClone(data[i]));
		}
	} else if (type === 'object') {
		for (var key in data) {
			obj[key] = deepClone(data[key]);
		}
	}
	return obj;
}

/**
 * 
 * 取出两个数组的不同元素(getArrDifference)
 * 
 * @param {array} arr1
 * @param {array} arr2
 * 
 * @returns {string}
 */
export function getArrDifference(arr1, arr2) {
	return arr1.concat(arr2).filter(function(v, i, arr) {
		console.log('v-', arr.indexOf(v), arr.lastIndexOf(v));
		return arr.indexOf(v) === arr.lastIndexOf(v);
	});
}

/**
 * 
 * 随机值(random)
 * 
 * @param {object} data
 * @param {date} date
 * 
 * @returns {string}
 */
export function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 
 * 根据id取出数组中的对象
 * 
 * @param {object} data
 * @param {date} date
 * 
 * @returns {string}
 */
export function idFoundObj(arr, id) {
	let obj = arr.find(function(x) {
		return x.id === id
	})
	return obj
}

/**
 * 
 * 获取时间
 * 
 * @param {object} data
 * @param {date} date
 * 
 * @returns {string}
 */
export function getDate(option, type) {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;;
	day = day > 9 ? day : '0' + day;
	if (option === 'year') {
		return `${year}`;
	} else if (option === 'month') {
		return `${year}-${month}`;
	} else {
		return `${year}-${month}-${day}`;
	}
}

/**
 * 
 * 生成随机 GUID 数
 * 
 * @param {object} data
 * @param {date} date
 * 
 * @returns {string}
 */
export function guid() {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
