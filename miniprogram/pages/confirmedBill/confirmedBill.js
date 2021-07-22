// pages/confirmedBill/confirmedBill.js
Page({

  /**
   * Page initial data
   */
  data: {
    billingNumber: '',
    numOfPieces: '',
    createTime:'',
    weight:'',
    volume:'',
    value:'',
    caiji:'',
    billingWeight:'',
    sender:'',
    receiver:'',
    billingType:'',
    deliveryCost:'',
    billing:'',
    isPickup:'',
    unpackCost:'',
    userID:'',
    pickUpAddress:'ai jia warehouse, 爱家奥克兰仓库，09-4543534，1 queen st, CBD, Auckland 1010, New Zealand',
    active: 0,
    steps: [
      {
        text: '',
        desc: '计划中',
      },
      {
        text: '',
        desc: '处理中',
      },
    ],
    pendingEdits:[],
    locationRef: '',
    latitude: 23.07,
    longitude: 113.15,
    markers: [{
      id: 1,
      latitude: 23.07,
      longitude: 113.15,
 
      label:{
        content: '广州',
        color: '#FF0202',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#FF0202',
        bgColor: '#ffffff',
        padding: 5,
        textAlign: 'center'
      },
      // callout: {
      //   content: '金水区绿地原盛国际1号楼A座9楼', 
      //   color: '#FF0202', 
      //   borderRadius: 3,
      //   borderWidth: 1,
      //   borderColor: '#FF0202',
      //   bgColor: '#ffffff',
      //   padding: 5,
      //   textAlign: 'center'
      // }
    }]
  },

  getDateFormat: function(ts){
    var d = new Date(ts).toISOString().slice(0,10);
    return d;
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    console.log(options.jsonStr);
    wx.cloud.callFunction({
      name: "getBill",
      data: {
        billingNumber: options.jsonStr
      },
      success: (res) => {
        console.log(this.getDateFormat(res.result.billing.data[0].createTime));
        this.setData({
          billingNumber: res.result.billing.data[0].billingNumber,
          numOfPieces: res.result.billing.data[0].numOfPieces,
          createTime: this.getDateFormat(res.result.billing.data[0].createTime),
          weight: res.result.billing.data[0].packageWeight,
          volume: res.result.billing.data[0].packageVolume,
          value: res.result.billing.data[0].packageEstimateValue,
          caiji: res.result.billing.data[0].packageCaiji,
          billingWeight: res.result.billing.data[0].billingWeight,
          sender: res.result.billing.data[0].senderAddressId,
          receiver: res.result.billing.data[0].receiverAddressId,
          billingType: res.result.billing.data[0].billingType,
          deliveryCost: res.result.billing.data[0].deliveryCost,
          billing: res.result.billing.data[0].billing,
          isPickup: res.result.billing.data[0].isPickup,
          unpackCost: res.result.billing.data[0].unpackCost,
          userID: res.result.billing.data[0].userID,
          locationRef: res.result.billing.data[0].currentLocationRef
        })
        wx.cloud.callFunction({
          name: "getTrackingInfo",
          data: {
            ref: options.jsonStr
          },
          success: (res) => {
            console.log(res)
            this.doPopulateSteps(res.result.data)
          },
          fail: (res)=>{
          },
          complete:(res)=>{
          }
        })
        wx.cloud.callFunction({
          name: "getPendingEditsByBillRef",
          data: {
            billingRef: options.jsonStr
          },
          success: (res) => {
            console.log(res.result.data.length);
            this.setData({
              pendingEdits: res.result.data,
            })
          },
          fail: console.error,
          complete:(res)=>{
            console.log("location id"+this.data.locationRef);
            wx.cloud.callFunction({
              name: "getCurrentLocation",
              data: {
                locationRef: this.data.locationRef
              },
              success: (res) => {
                console.log(res.result.data);
                this.setData({
                  latitude: res.result.data.latitude,
                  longitude: res.result.data.longitude,
                  markers: [{
                    id: 1,
                    latitude: res.result.data.latitude,
                    longitude: res.result.data.longitude,
               
                    label:{
                      content: res.result.data.city,
                      color: '#FF0202',
                      borderRadius: 3,
                      borderWidth: 1,
                      borderColor: '#FF0202',
                      bgColor: '#ffffff',
                      padding: 5,
                      textAlign: 'center'
                    },
                  }]
                })
              },
              fail: console.error,
              complete:(res)=>{
              }
            }) 
          }
        }) 
      },
      fail: console.error,
      complete:(res)=>{
        wx.hideLoading()
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    wx.getLocation({
      type: 'gcj02', //Returns the latitude and longitude that can be used for wx.openLocation
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 1
        })
      }
     })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  doPopulateSteps(data) {
    let steps = [];
    console.log(data[0].billingRef);
    if (data[0].processing != ""){
      steps.push({
        text: data[0].processing-1,
        desc: '计划中',
      })
      steps.push({
        text: data[0].processing,
        desc: '处理中',
      })
    }
    if (data[0].dispatched != undefined){
      steps.push({
        text: 11,
        desc: '已出库',
      })
      steps.push({
        text: data[0].dispatched,
        desc: '开始运输',
      })
    }
    
    // if (data[0].waitingReleasedFromChinaCustom == undefined){
    //   steps.push({
    //     text: data[0].waitingReleasedFromChinaCustom,
    //     desc: '等待中国海关放行',
    //   })
    // }
    // if (data[0].releasedFromChinaCustom == undefined){
    //   steps.push({
    //     text: data[0].releasedFromChinaCustom,
    //     desc: '中国海关已放行',
    //   })
    // }
    // if (data[0].inTransit == undefined){
    //   steps.push({
    //     text: data[0].inTransit,
    //     desc: '已运出，往奥克兰方向',
    //   })
    // }
    // if (data[0].arrivedInAKL == undefined){
    //   steps.push({
    //     text: data[0].arrivedInAKL,
    //     desc: '到达奥克兰港口',
    //   })
    // }
    // if (data[0].arrivedInStorage == undefined){
    //   steps.push({
    //     text: data[0].arrivedInStorage,
    //     desc: '到达奥克兰仓库',
    //   })
    // }
    // if (data[0].estimateDelivered == undefined){
    //   steps.push({
    //     text: data[0].estimateDelivered,
    //     desc: '预计送达',
    //   })
    // }
    this.setData({
      steps: steps,
      active : steps.length-1
    })
    console.log(steps);
  }
})