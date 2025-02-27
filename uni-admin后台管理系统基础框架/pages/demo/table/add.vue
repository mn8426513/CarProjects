<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" :rules="rules" validateTrigger="bind" @submit="submit">
			<uni-forms-item name="goods_name" label="车辆名称" required>
				<uni-easyinput v-model="formData.goods_name" :clearable="false" placeholder="请输入车辆名称" />
			</uni-forms-item>
			<uni-forms-item name="goods_brand" label="汽车品牌" required>
				<uni-easyinput v-model="formData.goods_brand" :clearable="false" placeholder="请输入汽车品牌" />
			</uni-forms-item>
			<uni-forms-item name="goods_alreadKilometer" label="公里数" required>
				<uni-easyinput v-model="formData.goods_alreadKilometer" :clearable="false" placeholder="请输入公里数" />
			</uni-forms-item>
			<uni-forms-item name="is_best" label="是否精品" class="flex-center-x" required>
				<switch @change="binddata('is_best', $event.detail.value)" :checked="formData.is_best" />
			</uni-forms-item>

			<uni-forms-item name="goods_paiLiang" label="车辆排量" required>
				<uni-easyinput v-model="formData.goods_paiLiang" :clearable="false" placeholder="请输入车辆排量" />
			</uni-forms-item>
			<uni-forms-item name="goods_bianSuXiang" label="变速箱" required>
				<uni-easyinput v-model="formData.goods_bianSuXiang" :clearable="false" placeholder="请输入变速箱" />
			</uni-forms-item>
			<uni-forms-item name="goods_quDongFangShi" label="驱动方式" required>
				<uni-easyinput v-model="formData.goods_quDongFangShi" :clearable="false" placeholder="请输入驱动方式" />
			</uni-forms-item>
			<uni-forms-item name="add_date" label="上架日期" required>
				<uni-datetime-picker type="date" v-model="formData.add_date" returnType="timestamp"
					:clearIcon="false" class="uni-stat-datetime-picker"
					:class="{'uni-stat__actived': !!formData.add_date}" />
			</uni-forms-item>
			<uni-forms-item name="goods_pro_date" label="生产日期" required>
				<uni-datetime-picker type="date" v-model="formData.goods_pro_date" returnType="timestamp"
					:clearIcon="false" class="uni-stat-datetime-picker"
					:class="{'uni-stat__actived': !!formData.goods_pro_date}" />
			</uni-forms-item>
<!-- 			<uni-forms-item name="tags" label="用户标签" labelWidth="100" class="flex-center-x">
				<uni-data-checkbox ref="checkbox" :multiple="true" v-model="formData.tags" collection="uni-id-tag"
					field="tagid as value, name as text"></uni-data-checkbox>
				<span class="link-btn" @click="gotoTagAdd">新增</span>
				<span class="link-btn" @click="gotoTagList" style="margin-left: 10px;">管理</span>
			</uni-forms-item>
			<uni-forms-item name="authorizedApp" label="可登录应用" labelWidth="100" class="flex-center-x">
				<uni-data-checkbox :multiple="true" v-model="formData.authorizedApp" collection="opendb-app-list"
					field="appid as value, name as text"></uni-data-checkbox>
				<span class="link-btn" @click="gotoAppList">管理</span>
			</uni-forms-item>
			<uni-forms-item name="mobile" label="手机号">
				<uni-easyinput v-model="formData.mobile" :clearable="false" placeholder="请输入手机号" />
			</uni-forms-item>
			<uni-forms-item name="email" label="邮箱">
				<uni-easyinput v-model="formData.email" :clearable="false" placeholder="请输入邮箱" />
			</uni-forms-item>
			<uni-forms-item name="status" label="是否启用">
			</uni-forms-item> -->

		</uni-forms>
		<view>
			<uni-card :is-shadow="false" is-full>
				<text class="uni-h6">文件选择上传组件，可以选择图片、视频等任意文件并上传到当前绑定的服务空间。</text>
			</uni-card>
			<uni-section title="只选择图片" type="line" style="padding-bottom: 5px;">
				<view class="example-body" style="width: 400px;height: 450px;">
					<uni-file-picker  ref="files" limit="9" 
					title="最多选择9张图片" 
					:auto-upload="false"
					@select="select" 
					@progress="progress" 
					@success="success" 
					@fail="fail" 
					:disable-preview="false">
					</uni-file-picker>
				</view>
				<button @click="upload" style="width: 100px;margin-bottom: 10px;margin-left: 15px;" type="primary" class="uni-button">上传图片</button>
				
			</uni-section>
			<br>
			
		</view>
		<view class="uni-button-group" >
			<button style="width: 100px;" type="primary" class="uni-button"
				@click="submitForm">{{$t('common.button.submit')}}</button>
			<navigator open-type="navigateBack" style="margin-left: 15px;"><button style="width: 100px;"
					class="uni-button">{{$t('common.button.back')}}</button></navigator>
		</view>
	</view>
</template>

<script>
	import {
		validator
	} from '@/js_sdk/validator/uni-id-users.js';
	
	import {
		mapfields,
		stringifyQuery,
		getTimeOfSomeDayAgo,
		division,
		format,
		debounce
	} from '@/js_sdk/uni-stat/util.js'

	const db = uniCloud.database();
	const dbCmd = db.command;
	const dbCollectionName = 'uni-id-users';

	function getValidator(fields) {
		let result = {}
		for (let key in validator) {
			if (fields.includes(key)) {
				result[key] = validator[key]
			}
		}
		return result
	}

	export default {
		data() {
			return {
				formData: {
					"add_date": getTimeOfSomeDayAgo(0),
					"goods_pro_date": getTimeOfSomeDayAgo(0),
					"goods_alreadKilometer": "123",
					"goods_name": "1212",
					"goods_brand": "123",
					"is_best": false,
					"goods_brand": "123",
					"goods_paiLiang": "123",
					"goods_bianSuXiang": "123",
					"goods_quDongFangShi": "123"
				},
				tempFiles: [],
				
				rules: {
					...getValidator(["username", "password", "role", "mobile", "email"]),
					"status": {
						"rules": [{
							"format": "bool"
						}]
					}
				},
				roles: [
					
				],
				imageStyles:{
					width:64,
					height:64,
					border: {
						radius: '50%'
					}
				},
				listStyles:{
					// 是否显示边框
					border: true,
					// 是否显示分隔线
					dividline: true,
					// 线条样式
					borderStyle: {
						width:1,
						color:'blue',
						style:'dashed',
						radius:2
					}
				}
			}
		},
		onLoad() {
			//this.loadroles()
		},
		methods: {
			/**
			 * 跳转应用管理的 list 页
			 */
			gotoAppList() {
				uni.navigateTo({
					url: '../app/list'
				})
			},
			gotoTagList() {
				uni.navigateTo({
					url: '../tag/list'
				})
			},
			gotoTagAdd() {
				uni.navigateTo({
					url: '../tag/add',
					events: {
						refreshCheckboxData: () => {
							this.$refs.checkbox.loadData()
						}
					}
				})
			},

			/**
			 * 触发表单提交
			 */
			submitForm() {
				this.$refs.form.submit();
			},

			/**
			 * 表单提交
			 * @param {Object} event 回调参数 Function(callback:{value,errors})
			 */
			submit(event) {
				const {
					value,
					errors
				} = event.detail
				if (event.detail.value.goods_name==='') {
					uni.showModal({
						content: '车辆名称必填',
						showCancel: false
					})
					return;
				}
				if (event.detail.value.goods_brand==='') {
					uni.showModal({
						content: '车辆品牌必填',
						showCancel: false
					})
					return;
				}
				if (event.detail.value.goods_alreadKilometer==='') {
					uni.showModal({
						content: '车辆公里数必填',
						showCancel: false
					})
					return;
				}
				if (event.detail.value.is_best==='') {
					uni.showModal({
						content: '车辆是否精品必选',
						showCancel: false
					})
					return;
				}
				if (event.detail.value.goods_paiLiang==='') {
					uni.showModal({
						content: '车辆排量必填',
						showCancel: false
					})
					return;
				}
				if (event.detail.value.goods_bianSuXiang==='') {
					uni.showModal({
						content: '车辆变速箱必填',
						showCancel: false
					})
					return;
				}
				if (event.detail.value.goods_quDongFangShi==='') {
					uni.showModal({
						content: '车辆名称不能为空',
						showCancel: false
					})
					return;
				}
				if (event.detail.value.add_date==='') {
					uni.showModal({
						content: '车辆上架日期必填',
						showCancel: false
					})
					return;
				}				
				if (event.detail.value.goods_pro_date==='') {
					uni.showModal({
						content: '车辆生产日期必填',
						showCancel: false
					})
					return;
				}
				if (this.tempFiles.length===0) {
					uni.showModal({
						content: '车辆图片必须上传',
						showCancel: false
					})
					return;
				}

				// 表单校验失败页面会提示报错 ，要停止表单提交逻辑
				if (errors) {
					return
				}
				uni.showLoading({
					title: '提交中...',
					mask: true
				})
				// 是否精品车的数据类型转换， 0 精品， 1 非精品
				if (typeof value.is_best === "boolean") {
					value.is_best = Number(!value.is_best)
				}
				
				this.saveGoodsData({	
					success: (res) => {
						// 返回上一页并刷新列表
						uni.showToast({
							title: '新增成功'
						})						
						this.getOpenerEventChannel().emit('refreshData')
						setTimeout(() => uni.navigateBack(), 500)					
					},
					fail: (res) => {
						uni.showToast({
							title: res.result['message'] || '保存失败',
							icon: 'error'
						})
					}
				})
			},
			
			upload() {
				this.$refs.files.upload()
			},
			// 获取上传状态
			select(e){
			},
			// 获取上传进度
			progress(e){
			},		
			// 上传成功
			success(e){			
				for (let i = 0; i < e.tempFiles.length; i++) {
					this.tempFiles.push(e.tempFiles[i])
				}
				uni.showModal({
					content: '上传图片成功',
					showCancel: false
				});				
			},

			// 上传失败
			fail(e){
				uni.showModal({
					content: '上传失败，请重新上传',
					showCancel: false
				});
			},
			// 添加保存数据的方法

			async saveGoodsData(options) {
				const {
					success,
					fail
				} = options
				try {
					// 准备要保存的数据对象
					const goodsData = {
						add_date: this.formData.add_date,
						goods_name: this.formData.goods_name,
						goods_brand: this.formData.goods_brand,
						goods_pro_date: this.formData.goods_pro_date,
						goods_alreadKilometer: this.formData.goods_alreadKilometer,
						status: 1, // 1表示在售
						shop_name: this.formData.shop_name,
						goods_thumb: this.tempFiles[0]?.url || '',
						create_date: Date.now()
					}

					// 调用云函数保存数据
					const result = await uniCloud.callFunction({
						name: 'saveGoodsData',
						data: {
							action: 'add',
							tableName: 'opendb-mall-goods',
							data: goodsData
						}
					})
					console.log(result)
					console.log(result.header["x-serverless-http-status"])
					console.log(result.result["code"])
					console.log(result["success"])
					console.log(result.result["message"])
				
					if (result.success && !result.result["code"] && result.header["x-serverless-http-status"] == '200') {			
						setTimeout(() => {
							console.log('success_')
							success(result)
							typeof success === 'function' && success(result)
						}, 500) 

					} else {
						typeof fail === 'function' && fail(result)
					}
				} catch (e) {
					typeof fail === 'function' && fail(result)
				}
			}
		}
	}
</script>
<style>
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
	
	view {
		font-size: 14px;
		line-height: inherit;
	}
	
	.example {
		padding: 0 15px 15px;
	}
	
	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}
	
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}
	/* #endif */
	.example {
		padding: 0 15px;
	}
	
	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}
	
	.example-info-text {
	    font-size: 14px;
	    line-height: 20px;
		color: #3b4144;
	}
	
	
	.example-body {
	  flex-direction: column;
	  padding: 15px;
	  background-color: #ffffff;
	}
	
	.word-btn-white{
		font-size: 18px;
	  color:#FFFFFF;
	}
	
	.word-btn {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: row;
	  align-items: center;
	  justify-content: center;
	  border-radius: 6px;
	  height: 48px;
	  margin: 15px;
	  background-color: #007AFF;
	}
	
	.word-btn--hover {
	  background-color: #4ca2ff;
	}
	.custom-image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.text {
		font-size: 14px;
		color: #333;
	}
	::v-deep .uni-forms-item__label {
		width: 90px !important;
	}
	
	
</style>
