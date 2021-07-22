// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database() 

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('pendingEdits').doc(event.itemId).update({
    // data 传入需要局部更新的数据
    data: {
      // 表示将 done 字段置为 true
      packageName: event.packageName,
      numOfPieces: event.numOfPieces,
      packageMaterial: event.packageMaterial,
      price: event.price,
      totalPrice: event.totalPrice,
      status: 1
    },
    fail: function(res) {
      
    },
    success: function(res) {
      
    }
  })
}