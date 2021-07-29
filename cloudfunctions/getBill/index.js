// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const billing = await db.collection("billings").where({
    userID:wxContext.OPENID,
    billingNumber: event.billingNumber
  }).get();
  return {
    billing
  };
}