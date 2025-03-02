<template>
	<view>
		<view class="uni-header">
			<view class="uni-group hide-on-phone">
				<view class="uni-title">{{$t('demo.table.title')}}</view>
			</view>
			<view class="uni-group">
				<!-- 输入框 -->
				<input class="uni-search" type="text" v-model="searchVal" @confirm="search" :placeholder="$t('common.placeholder.query')" />
				<!-- 搜索按钮 -->
				<button class="uni-button" type="default" size="mini" @click="search">{{$t('common.button.search')}}</button>
				<!-- 添加按钮 -->
				<button class="uni-button" type="primary" size="mini" @click="navigateTo('./add')">{{$t('common.button.add')}}</button>
				<!-- 批量删除按钮 -->
				<button class="uni-button" type="warn" size="mini" @click="batchDeleteTable">{{$t('common.button.batchDelete')}}</button>
			</view>
		</view>
		<view class="uni-container">
			<!-- 表格组件 -->
			<uni-table :loading="loading" border stripe type="selection" :emptyText="$t('common.empty')" @selection-change="selectionChange">
				<uni-tr>
					<!-- 表头列 -->
					<uni-th width="100" align="center">上架日期</uni-th>
					<uni-th width="100" align="center">名称</uni-th>
					<uni-th width="100" align="center">品牌</uni-th>
					<uni-th width="100" align="center">年份</uni-th>
					<uni-th width="80" align="center">公里数</uni-th>
					<uni-th width="80" align="center">在售状态</uni-th>
					<uni-th width="80" align="center">销售人员</uni-th>
					<uni-th width="60" align="center">首页图片</uni-th>
					<uni-th width="120" align="center">操作</uni-th>
				</uni-tr>
				<uni-tr v-for="(item ,index) in tableData" :key="index">
					<!-- 表格数据列 -->
					<uni-td>{{item.add_date}}</uni-td>
					<uni-td>{{item.goods_name}}</uni-td>
					<uni-td>
						<view class="name">{{item.goods_brand}}</view>
					</uni-td>
					<uni-td>{{item.goods_pro_data}}</uni-td>
					<uni-td>{{item.goods_alreadKilometer}}</uni-td>
					<uni-td>
						在售
					</uni-td>
					<uni-td>{{item.shop_name}}</uni-td>
					<uni-td>
						<view class="uni-thumb shop-picture shop-picture-column">
							<image :src="item.goods_thumb"  mode="aspectFill" @click.stop="prviewImage(item.goods_thumb)"></image>
						</view>
					</uni-td>
					<uni-td>
						<view class="uni-group">
							<!-- 删除按钮 -->
							<button class="uni-button" size="mini" type="warn" @click="deleteItem(item._id)">{{$t('common.button.delete')}}</button>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box">
				<!-- 分页组件 -->
				<uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" />
			</view>
		</view>
		<!-- #ifndef H5 -->
		<fix-window />
		<!-- #endif -->
	</view>
</template>


<script>
import tableData from './tableData'

	// 导入名为 "tableData" 的模块，路径为 './tableData.js'
	//import tableData from './tableData.js'

	// 导出默认模块
	export default {
		// 数据属性
		data() {
			return {
				// 搜索值
				searchVal: '',
				// 表格数据
				tableData: [],
				// 每页数据量
				pageSize: 10,
				// 当前页
				pageCurrent: 1,
				// 数据总量
				total: 0,
				// 加载状态
				loading: false
			}
		},

		// 页面加载时的处理函数
		onLoad() {
			// 重置选中项数组
			this.selectedIndexs = []
			// 获取第一页数据
			this.getData(1)
		},

		// 方法
		methods: {
			navigateTo(url, clear) {
				// clear 表示刷新列表时是否清除页码，true 表示刷新并回到列表第 1 页，默认为 true
				uni.navigateTo({
					url,
					events: {
						refreshData: () => {
							this.loadTags()
							this.loadData(clear)
						}
					}
				})
			},
			// 多选事件处理函数
			selectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
			// 批量删除函数
			batchDeleteTable() {
				let selectedItems = this.selectedItems();
				if (!selectedItems || !selectedItems.length) {
					uni.showModal({
						content: '请选择需要删除的车',
						showCancel: false
					})
					return;
				} else {
					const selectedItemsIds = selectedItems.map(item => item._id)
					uni.showModal({
						title: '提示',
						content: '确定要删除选中的数据吗？',
						success: async (res) => {
							if (res.confirm) {
								this.deleteBatchGoodsData({
									success: (res) => {
										uni.showToast({
											title: '删除成功'
										})
										this.tableData = this.tableData.filter(item => !selectedItemsIds.includes(item._id));
									},
									fail: (res) => {
										uni.showToast({
											title: res.result['message'] || '删除失败',
											icon: 'error'
										})
									},
									_ids: selectedItemsIds
								})
							}
						}
					})
					

					
				}
			},
			// 多选处理
			selectedItems() {
				if (!this.selectedIndexs || !this.tableData) {
					return []
				} else {
					return this.selectedIndexs.map(index => this.tableData[index]);
				}
			},
			
			// 单笔选中删除回调函数
			deleteItem(_id) {
				uni.showModal({
					title: '提示',
					content: '确定要删除本条数据吗？',
					success: async (res) => {
						if (res.confirm) {
							this.deleteGoodsData({
								_id: _id,
								success: (res) => {
									uni.showToast({
										title: '删除成功'
									})
									this.tableData = this.tableData.filter(item => item._id !== _id);
								},
								fail: (res) => {
									uni.showToast({
										title: res.result['message'] || '删除失败',
										icon: 'error'
									})
								}
							})
						}
					}
				})
			},
			
			
			// 删除单笔数据记录的方法
			async deleteGoodsData(options) {
				const {
					success,
					fail,
					_id
				} = options
				try {
					// 准备要保存的数据对象
					const goodsData = {
						_id: options._id
					}
					console.log(goodsData)
			
					// 调用云函数保存数据
					const result = await uniCloud.callFunction({
						name: 'deleteGoodsData',
						data: {
							action: 'delete',
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
							console.log('delete success')
							success(result)
							typeof success === 'function' && success(result)
						}, 500) 
			
					} else {
						typeof fail === 'function' && fail(result)
					}
				} catch (e) {
					typeof fail === 'function' && fail(result)
				}
			},
			
			
			
			// 批量删除数据的方法
			async deleteBatchGoodsData(options) {
				const {
					success,
					fail,
					_ids
				} = options
				try {
					// 准备要保存的数据对象
					const goodsData = {
						_ids: options._ids
					}
					console.log(goodsData)
			
					// 调用云函数保存数据
					const result = await uniCloud.callFunction({
						name: 'deleteGoodsData',
						data: {
							action: 'deleteBatch',
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
							console.log('deleteBatch success')
							success(result)
							typeof success === 'function' && success(result)
						}, 500) 
			
					} else {
						typeof fail === 'function' && fail(result)
					}
				} catch (e) {
					typeof fail === 'function' && fail(result)
				}
			},

			// 分页触发事件处理函数
			change(e) {
				this.getData(e.current)
			},

			// 搜索函数
			search() {
				this.getData(1, this.searchVal)
			},
			
			// 图片方法预览功能
			prviewImage(img, index) {
				let urls = []
				urls.push(img)
				console.log(urls) 
				uni.previewImage({
					urls: urls,
					current: 0
				});
			},

			// 获取数据函数
			getData(pageCurrent, value = "") {
				this.loading = true
				this.pageCurrent = pageCurrent
				this.request({
					pageSize: this.pageSize,
					pageCurrent: pageCurrent,
					value: value,
					success: (res) => {
						this.tableData = res.data
						this.total = res.total
						this.loading = false
					}
				})
			},

			// 伪request请求函数
			request(options) {
				const {
					pageSize,
					pageCurrent,
					success,
					value
				} = options

				uniCloud.callFunction({
					name: 'getGoodsData'
				}).then(res => {
					if (res.result && !res.result.errorCode) {
						
							let total = res.result.length;	
							let data = res.result.filter((item, index) => {
								const idx = index - (pageCurrent - 1) * pageSize
								return idx < pageSize && idx >= 0
							})
							
							if (value) {
								data = []
								res.result.forEach(item => {
									if (item.goods_name.indexOf(value) !== -1) {
										data.push(item)
									}
								})
								total = data.length
							}

 							setTimeout(() => {
								typeof success === 'function' && success({
									data: data,
									total: total
								})
							}, 500) 
						} else {
							console.error('获取数据失败：', res.result.errorMessage);
						}
				}).catch(err => {
					console.error('调用云函数失败：', err);
				});


			}
		}
	}
</script>


<style>
	/* #ifndef H5 */
	page {
		padding-top: 85px;
	}

	/* #endif */
</style>
