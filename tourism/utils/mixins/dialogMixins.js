export default {
	props: {
		visible: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {}
	},
	methods: {
		beforeDialogClose() {
			this.$emit('update:visible', false)
		}
	}
}
