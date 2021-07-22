// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const loginUserID = wxContext.OPENID;
  const senderAddress = await db.collection("addresses").where({
    userID:loginUserID,
    isSender: true,
    isUsed: true
  }).get();
  const receiverAddress = await db.collection("addresses").where({
    userID:loginUserID,
    isReceiver: true,
    isUsed: true
  }).get();
  return {
    senderAddress,
    receiverAddress
  };
}