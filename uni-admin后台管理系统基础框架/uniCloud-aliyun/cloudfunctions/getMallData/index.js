'use strict';
// 云函数 getMallData
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    const collection = db.collection('mall_info');
    const res = await collection.get();
    return res.data;
  } catch (error) {
    return {
      errorCode: 1,
      errorMessage: error.message
    };
  }
};