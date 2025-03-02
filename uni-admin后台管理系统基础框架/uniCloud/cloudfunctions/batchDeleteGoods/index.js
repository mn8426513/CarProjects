'use strict';

const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
    const { ids, tableName } = event
    
    if (!ids || !ids.length) {
        return {
            code: 1,
            message: '请选择要删除的数据'
        }
    }
    
    try {
        const collection = db.collection(tableName)
        const res = await collection.where({
            _id: dbCmd.in(ids)
        }).remove()
        
        if (res.deleted) {
            return {
                code: 0,
                message: '删除成功',
                ...res
            }
        } else {
            return {
                code: 1,
                message: '删除失败',
                ...res
            }
        }
    } catch (e) {
        return {
            code: 500,
            message: e.message || '服务器错误'
        }
    }
} 