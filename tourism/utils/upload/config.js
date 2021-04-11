let fileHost = "http://hatu-cdn.oss-cn-hangzhou.aliyuncs.com/"
let config = {
	//aliyun OSS config
	uploadImageUrl: `${fileHost}`, //默认存在根目录，可根据需求改
	AccessKeySecret: 'Ieyvf7dwNKbImtsJOF2w32BN64rNBX',
	OSSAccessKeyId: 'LTAI4FzGpbK5C8FkfJbv13gS',
	timeout: 87600 //这个是上传文件时Policy的失效时间
};
module.exports = config
