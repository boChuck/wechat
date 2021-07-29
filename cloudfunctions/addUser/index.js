// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const newUserID = wxContext.OPENID;
  await db.collection("users").add({
    // data 字段表示需新增的 JSON 数据
    data: {
       userID: newUserID,
       avatarUrl: event.avatarUrl,
       nickname: event.nickname,
       gender: event.gender,
       country: event.country,
       province: event.province,
       signature: event.signature,
       isAdmin: false
    },
    success: function(res) {
      
    }
  });
  const users = await db.collection("users").where({
    userID:newUserID,
  }).get();
  return {
    users
  };
}