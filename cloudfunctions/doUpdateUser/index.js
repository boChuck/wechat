// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const guid = Date.now()
  return await db.collection('users').where({
    userID:wxContext.OPENID,
  }).update({
    // data 传入需要局部更新的数据
    data: {
      name: event.name,
      email:  event.email,
      contactNumber:  event.contactNumber,
      customerNumber: event.name+guid,
      isRegisteredUser: true
    },
    fail: function(res) {
      
    },
    success: function(res) {
      
    }
  })
}