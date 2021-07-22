// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('addresses').doc(event.itemId).update({
    // data 传入需要局部更新的数据
    data: {
      addressDescription: event.addressDescription,
      firstname:  event.firstname,
      surname:  event.surname,
      contactNumber:  event.contactNumber,
      street:  event.street,
      area:  event.area,
      city:  event.city,
      country:  event.country,
      postcode:  event.postcode
    },
    fail: function(res) {
      
    },
    success: function(res) {
      
    }
  })
}