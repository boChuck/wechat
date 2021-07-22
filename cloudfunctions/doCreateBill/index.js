// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const newUserID = wxContext.OPENID;
  const createTime = Date.now();
  const billNum = "AJ"+createTime+"B";
  await db.collection("billings").add({
    // data 字段表示需新增的 JSON 数据
    data: {
       userID: newUserID,
       numOfPieces: event.numOfPieces,
       packageEstimateValue: event.packageEstimateValue,
       packageVolume: event.packageVolume,
       packageWeight: event.packageWeight,
       packageCaiji: event.packageCaiji,
       billingWeight: event.billingWeight,
       senderAddressId: event.senderAddressId,
       receiverAddressId: event.receiverAddressId,
       billingType: event.billingType,
       deliveryCost: event.deliveryCost,
       billing: event.billing,
       isPickup: event.isPickup,
       createTime: createTime,
       updateTime: null,
       isPaid: false,
       billingNumber: billNum,
       unpackCost: event.unpackCost,
       status: '0'
    },
    success: function(res) {
    }
  });
  return {
    billNum
  };
}