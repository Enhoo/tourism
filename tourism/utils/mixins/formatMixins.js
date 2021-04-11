export default {
	filters: {
		filterOrderType(type) {
			switch (type) {
				case 1:
					return '课时'
				case 2:
					return '包月'
			}
		},
		filterOrderProp(type) {
			switch (type) {
				case 1:
					return '新生缴费'
				case 2:
					return '老生续费'
			}
		},
	},
	methods: {
		compare(arg) {
			return function(a, b) {
				return b[arg] - a[arg];
			}
		}
	}
}
