/**
 * 
 * 转换学生状态
 * 
 * @param {object} type
 * 
 * @returns {string}
 */
export function studentStatus(type) {
	switch (Number(type)) {
		case 0:
			return '沟通中'
		case 1:
			return '测试中'
		case 2:
			return '试读中'
		case 3:
			return '等待开班'
		case 4:
			return '学习中'
		case 5:
			return '已停课'
		case 6:
			return '其他'
		default:
			return false
	}
}

/**
 *
 * 转换来源
 *
 * @param {object} type
 *
 * @returns {string}
 */
export function sourceStatus(type) {
  switch (Number(type)) {
    case 0:
      return '其他'
    case 1:
      return '官网'
    case 2:
      return '微信小程序'
    case 3:
      return '平台导入'
    case 4:
      return 'excel导入'
    case 5:
      return '移动官网'
    case 6:
      return '渠道'

    default:
      return false
  }
}

/**
 * 
 * 转换时间
 * 
 * @param {string} type
 * 
 * @returns {string}
 */
export function switchDate(time) {
	let time_ = time.replace("-", "/").replace("-", "/");
	return Date.parse(time_) / 1000;
}

/**
 * 
 * 转换中文数字
 * 
 * @param {Number} type
 * 
 * @returns {string}
 */
export function switchNum(params) {
	let num = Number(params)
	switch (num) {
		case 1:
			return '一'
		case 2:
			return '二'
		case 3:
			return '三'
		case 4:
			return '四'
		case 5:
			return '五'
		case 6:
			return '六'
		case 7:
			return '七'
		case 8:
			return '八'
		case 9:
			return '九'
		default:
			return false
	}
}

/**
 * 
 * 转换中文周期
 * 
 * @param {Number} type
 * 
 * @returns {string}
 */
export function switchWeek(params) {
	let num = Number(params)
	switch (num) {
		case 1:
			return '一'
		case 2:
			return '二'
		case 3:
			return '三'
		case 4:
			return '四'
		case 5:
			return '五'
		case 6:
			return '六'
		case 7:
			return '日'
		default:
			return false
	}
}