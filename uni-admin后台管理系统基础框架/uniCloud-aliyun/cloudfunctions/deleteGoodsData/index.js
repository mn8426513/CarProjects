'use strict';

const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
    const {
        action,
        tableName,
        data
    } = event
    
    try {
        switch (action) {
            case 'delete':
                const collection = db.collection(tableName)
				const res = await collection.doc(data._id).remove();
                return {
                    code: 0,
                    message: '删除成功',
                    data: res
                }
			case 'deleteBatch':
				const collectionBatch = db.collection(tableName)
				const resBatch = await collectionBatch.where({
					_id: dbCmd.in(data._ids)
				}).remove();
				return {
				    code: 0,
				    message: '批量删除成功',
				    data: resBatch
				}
            default:
                return {
                    code: 400,
                    message: '未知操作'
                }
        }
    } catch (e) {
        return {
            code: 500,
            message: e.message || '服务器错误'
        }
    }
}