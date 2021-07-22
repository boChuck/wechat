// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database() 

// 云函数入口函数
exports.main = async (event, context) => {
  const result = 0;
  event.items.forEach(async element => {
    await db.collection('pendingEdits').doc(element).update({
      // data 传入需要局部更新的数据
      data: {
        billingRef: event.billingRef,
        status: 2
      },
      fail: function(res) {
        result:1
      },
      success: function(res) {
        result:0
      }
    })
  });
  return {
    result
  };
}