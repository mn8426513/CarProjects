'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
    const {
        action,
        tableName,
        data
    } = event
    
    try {
        switch (action) {
            case 'add':
                const collection = db.collection(tableName)
                const res = await collection.add(data)
                return {
                    code: 0,
                    message: '添加成功',
                    data: res
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