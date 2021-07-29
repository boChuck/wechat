// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const newUserID = wxContext.OPENID;
  const createTime = Date.now();
  const result = 0;
  await db.collection("trackingInformation").add({
    // data 字段表示需新增的 JSON 数据
    data: {
       billingRef: event.billingRef,
       userID: newUserID,
       processing: createTime,
       arrivedInAKL: '',
       arrivedInStorage: '',
       dispatched: '',
       estimateDelivered:'',
       hasDelivered: '',
       inTransit:'',
       releasedFromChinaCustom:'',
       waitingReleasedFromChinaCustom: ''

    },
    fail: function(res) {
      result:1
    },
    success: function(res) {
      result:0
    }
  });
  return {
    result
  };
}