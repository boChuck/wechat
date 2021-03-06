// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database() 

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('settings').where({
      _id : "recordID"
    }).update({
      // data 传入需要局部更新的数据
      data: {
        ratio: event.ratio,
        chaibaoCost:  event.chaibaoCost,
        internationalCargoCost:  event.internationalCargoCost,
      }
    })
  } catch (error) {
    db.collection('logs').add({
      data: {
        error: error.errCode + error.errMsg,
      },
    })
  }
  
}