export function chooseImage(count = 1) {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count,
			sizeType: ['compressed'],
			sourceType: ['album'],
			success: (res) => {
				// console.log('chooseImage success, temp path is', res.tempFilePaths[0])
				let imageSrc = res.tempFilePaths[0]
				resolve(imageSrc)
			},
			fail: (err) => {
				// console.log('chooseImage fail', err)
				reject(err)
			}
		})
	})
}
