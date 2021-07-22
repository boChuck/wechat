// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const loginUserID = wxContext.OPENID;
  return await db.collection("addresses").where({
    userID:loginUserID,
    isSender: true,
  }).get();
}