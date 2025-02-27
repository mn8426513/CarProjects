'use strict';
// 云函数 getGoodsData
const db = uniCloud.database();

exports.main = async (event, context) => {
  try {
    const collection = db.collection('opendb-mall-goods');
    const res = await collection.get();
    return res.data;
  } catch (error) {
    return {
      errorCode: 1,
      errorMessage: error.message
    };
  }
};