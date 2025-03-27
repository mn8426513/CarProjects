<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" :rules="rules" validateTrigger="bind" @submit="submit">
			<uni-forms-item name="mall_name" label="店铺名称" required>
				<uni-easyinput v-model="formData.mall_name" :clearable="false" placeholder="请输入店铺名称" />
			</uni-forms-item>
<!-- 			<uni-forms-item name="goods_brand" label="汽车品牌" required>
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
 -->
		</uni-forms>
		<view>
			<uni-card :is-shadow="false" is-full>
				<text class="uni-h6">可上传9张店铺图片。</text>
			</uni-card>
			<uni-section title="只选择图片" type="line" style="padding-bottom: 5px;">
				<view class="example-body" style="width: 400px;height: 450px;">
					<uni-file-picker  ref="files" limit="12" 
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
					"mall_name": ""
				},
				imageFile_list: [],
				
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
			 * 跳转应用管理的 table 页
			 */
			gotoAppList() {
				uni.navigateTo({
					url: './table'
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
						content: '店铺名称必填',
						showCancel: false
					})
					return;
				}

				if (this.imageFile_list.length===0) {
					uni.showModal({
						content: '店铺图片必须上传',
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

				
				this.saveMallInfoData({	
					success: (res) => {
						// 返回上一页并刷新列表
						uni.showToast({
							title: '新增成功，请在手机端查看'
						})
						//this.gotoAppList()
						/* this.getOpenerEventChannel().emit('refreshData')
						setTimeout(() => uni.navigateBack(), 500)	 
						*/				
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
					this.imageFile_list.push(e.tempFiles[i])
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
			async saveMallInfoData(options) {
				const {
					success,
					fail
				} = options
				try {
					// 准备要保存的数据对象
					const goodsData = {
						mall_name: this.formData.mall_name,
						imageFile_list: JSON.stringify(this.imageFile_list)
						
					}
					console.log(goodsData)

					// 调用云函数保存数据
					const result = await uniCloud.callFunction({
						name: 'saveMallData',
						data: {
							action: 'add',
							tableName: 'mall_info',
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
