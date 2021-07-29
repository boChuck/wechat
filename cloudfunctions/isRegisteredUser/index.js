// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const loginUserID = wxContext.OPENID;
  const users = await db.collection("users").where({
    userID:loginUserID,
    isRegisteredUser:true,
  }).get();
  
  return {
    users
  };
}