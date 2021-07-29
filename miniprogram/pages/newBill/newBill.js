// pages/newBill/newBill.js

Page({

  /**
   * Page initial data
   */
  data: {
    steps: [
      {
        text: '步骤一',
        desc: '',
      },
      {
        text: '步骤二',
        desc: '',
      },
      {
        text: '步骤三',
        desc: '',
      },
      {
        text: '步骤四',
        desc: '',
      },
      {
        text: '步骤五',
        desc: '',
      },
    ],
    yundanType: '1',
    yundanChannel: '1',
    active: 0,
    result: [],
    completedItems: {},
    switchUnpack : [],
    selectedItems: [],
    selectedItemIds: [],
    totalVolume: 0,
    totalWeight: 0,
    totalCaiJi: 0,
    totalPrice: 0,
    defaultSenderAddress: '',
    defaultReceiverAddress: '',
    isPickup: false,
    isAgree: false,
    deliveryCost: '99',
    billing: '999',
    unpackCost: '10',
    numOfPieces: '',
    isMissingSenderAddress:false,
    isMissingReceiverAddress:false,
    defaultLocationRef: ''
  },

  onYundanChannelChange(event) {
    this.setData({
      yundanChannel: event.detail,
    });
  },

  onYundanTypeChange(event){
    this.setData({
      yundanType: event.detail,
    });
  },

  onSwitchChange(event) {
    const detail = event.detail;
    const newSwitchUnpack = this.data.switchUnpack;
    newSwitchUnpack[event.currentTarget.id] = detail.value;
    this.setData({
      switchUnpack : newSwitchUnpack
    })
  },
  doEditAddress(event){
    console.log(event);
  },
  onIsAgreeChange(event){
    console.log(event.detail);
    this.setData({
      isAgree : event.detail
    })
  },
  // onSwitchAllChange(event) {
  //   console.log(event.detail);
  //   for (let index = 0; index < this.data.switchUnpack.length; index++) {
  //     this.data.switchUnpack[index] = event.detail.value;
  //   }
  //   const newSwitchUnpack = this.data.switchUnpack;
  //   this.setData({
  //     switchUnpack: newSwitchUnpack
  //   })
  //   console.log(this.data.switchUnpack);
  // },
  // onSelectAllChange(event) {
  //   console.log(event);
    
  //   for (let index = 0; index < this.data.completedItems.length; index++) {
  //     this.data.result[index] = event.detail;
     
  //     this.data.totalPrice = this.data.totalPrice + Number(this.data.completedItems[index].totalPrice);
  //     this.data.totalVolume = this.data.totalVolume + Number(this.data.completedItems[index].volume);
  //     this.data.totalWeight = this.data.totalWeight + Number(this.data.completedItems[index].weight),
  //     this.data.totalCaiJi = this.data.totalCaiJi + Number(this.data.completedItems[index].caiji)
  //   }
  //   const newResult = this.data.result;
  //   console.log(this.data.result);
  //   console.log(this.data.totalPrice);
  //   this.setData({
  //     result: newResult,
  //     selectedItems: this.data.completedItems,
  //     totalPrice: this.data.totalPrice.toFixed(2),
  //     totalVolume: this.data.totalVolume.toFixed(2),
  //     totalWeight: this.data.totalWeight.toFixed(2),
  //     totalCaiJi: this.data.totalCaiJi.toFixed(2)
  //   });
  //   console.log(this.data.result);
  // },
  onPickupChange(event){
    console.log(event.detail);
    this.setData({
      isPickup : event.detail
    })
  },

  onSelectChange(event){
    const detail = event.detail;
    const newSResult = this.data.result;
    newSResult[event.currentTarget.id] = detail;
    if (detail){
       this.data.totalPrice =  Number(this.data.totalPrice) + Number(this.data.completedItems[event.currentTarget.id].totalPrice);
      this.data.totalVolume = Number(this.data.totalVolume) + Number(this.data.completedItems[event.currentTarget.id].volume);
      this.data.totalWeight = Number(this.data.totalWeight) + Number(this.data.completedItems[event.currentTarget.id].weight);
      this.data.totalCaiJi = Number(this.data.totalCaiJi) + Number(this.data.completedItems[event.currentTarget.id].caiji);
      this.data.selectedItems.push(this.data.completedItems[event.currentTarget.id]);
      this.data.selectedItemIds.push(this.data.completedItems[event.currentTarget.id]._id);
    }
    else{
      this.data.totalPrice = Number(this.data.totalPrice) - Number(this.data.completedItems[event.currentTarget.id].totalPrice);
      this.data.totalVolume = Number(this.data.totalVolume) - Number(this.data.completedItems[event.currentTarget.id].volume);
      this.data.totalWeight = Number(this.data.totalWeight) - Number(this.data.completedItems[event.currentTarget.id].weight);
      this.data.totalCaiJi = Number(this.data.totalCaiJi) - Number(this.data.completedItems[event.currentTarget.id].caiji);
      this.data.selectedItems = this.data.selectedItems.filter(item => item !== this.data.completedItems[event.currentTarget.id]);
      this.data.selectedItemIds = this.data.selectedItemsIds.filter(item => item !== this.data.completedItems[event.currentTarget.id]._id);
    }
    this.setData({
      result : newSResult,
      selectedItems: this.data.selectedItems,
      selectedItemIds: this.data.selectedItemIds,
      totalPrice: this.data.totalPrice.toFixed(2),
      totalVolume: this.data.totalVolume.toFixed(2),
      totalWeight: this.data.totalWeight.toFixed(2),
      totalCaiJi: this.data.totalCaiJi.toFixed(2)
    })
  },

  doStepDown(event){
    console.log(this.data.active),
    this.setData({
      active: this.data.active + 1,
      isMissingSenderAddress:false,
      isMissingReceiverAddress:false,
    });
    if(this.data.active==2){
      wx.showLoading({
        title: '加载中...',
      })
      wx.cloud.callFunction({
        name: "getDefaultAddress",
        success: (res) => {
          console.log(res.result.senderAddress.data[0]);
          console.log(res.result.receiverAddress.data[0]);
          this.setData({
            defaultSenderAddress: res.result.senderAddress.data[0],
            defaultReceiverAddress: res.result.receiverAddress.data[0],
          })
          if(this.data.defaultSenderAddress==undefined){
            this.setData({
              isMissingSenderAddress: true,
            })
          }
          if(this.data.defaultReceiverAddress==undefined){
            this.setData({
              isMissingReceiverAddress:true,
            })
          }
        },
        fail: console.error,
        complete:(res)=>{
          wx.hideLoading()
        }
      })
    }
    if(this.data.active==3){
      console.log(this.data.defaultReceiverAddress)
      if(this.data.defaultReceiverAddress==undefined){
        this.setData({
          active: 2,
        });
        Notify({ type: 'danger', message: '请选择收货人的地址' });
      }
      if(this.data.defaultSenderAddress==undefined){
        this.setData({
          active: 2,
        });
        Notify({ type: 'danger', message: '请选择发货人的地址' });
      }
    }
  },
  doStepUp(event){
    console.log(this.data.active),
    this.setData({
      active: this.data.active - 1,
    });
  },
  doPreviewBill(event){
    console.log(this.data);
    this.setData({
      active: 4,
    });
  },
  doSubmitBill(event){
    console.log(this.data);
    wx.showLoading({
      title: '提交中...',
    })
    console.log(this.data.selectedItems.length);
    wx.cloud.callFunction({
      name: "doCreateBill",
      data:{
        numOfPieces: this.data.selectedItems.length,
        packageEstimateValue: this.data.totalPrice,
        packageVolume: this.data.totalVolume,
        packageWeight: this.data.totalWeight,
        packageCaiji: this.data.totalCaiJi,
        billingWeight: this.data.totalWeight,
        senderAddressId: this.data.defaultSenderAddress._id,
        receiverAddressId: this.data.defaultReceiverAddress._id,
        billingType: this.data.yundanType,
        deliveryCost: this.data.deliveryCost,
        billing: this.data.billing,
        isPickup: this.data.isPickup,
        unpackCost: this.data.unpackCost,
        currentLocationRef: this.data.defaultLocationRef
      },
      success: (res) => {
        console.log(res.result.billNum);
        const str = res.result.billNum;
        try {
          this.doUpdatePackges(str,this.data.selectedItemIds)
          this.doCreateTrackingInfos(str)
        } catch (error) {
          
        }
        wx.redirectTo({
          url: '/pages/confirmedBill/confirmedBill?jsonStr='+str,
          success:function(res) {
            console.log("ok",res);
            wx.hideLoading()
           },      
           fail : function(res){
             console.log("failed",res);
             wx.hideLoading()
           }
        })
      },
      fail: function(res){
        console.log("failed",res);
        wx.hideLoading();
        wx.redirectTo({
          url: '/pages/error/error?jsonStr='+res.errMsg,
          success:function(res) {
            console.log("ok",res);
            wx.hideLoading()
           },      
           fail : function(res){
             console.log("failed",res);
             wx.hideLoading()
           }
        })
      }
    })
    
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.doGetDefaultTrackingLocation();
    wx.cloud.callFunction({
      name: "getCompletedEdits",
      success: (res) => {
        console.log(res.result.data.length);
        this.setData({
          completedItems: res.result.data
        })
        for (let index = 0; index < res.result.data.length; index++) {
          const element = res.result.data[index];
          this.setData({
            switchUnpack : this.data.switchUnpack.concat(element.unpack),
            result: this.data.result.concat(element.isSelected)
          })
        }
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
      if(this.data.active==2 && (this.data.isMissingReceiverAddress || this.data.isMissingSenderAddress)){
        wx.showLoading({
          title: '加载中...',
        })
        wx.cloud.callFunction({
          name: "getDefaultAddress",
          success: (res) => {
            console.log(res.result.senderAddress.data[0]);
            console.log(res.result.receiverAddress.data[0]);
            this.setData({
              defaultSenderAddress: res.result.senderAddress.data[0],
              defaultReceiverAddress: res.result.receiverAddress.data[0],
            })
            if(this.data.defaultSenderAddress==undefined){
              this.setData({
                isMissingSenderAddress: true,
              })
            }
            else
            {
              this.setData({
                isMissingSenderAddress: false,
              })
            }
            if(this.data.defaultReceiverAddress==undefined){
              this.setData({
                isMissingReceiverAddress:true,
              })
            }
            else
            {
              this.setData({
                isMissingReceiverAddress: false,
              })
            }
          },
          fail: (res)=>{
            wx.hideLoading()
          },
          complete:(res)=>{
            wx.hideLoading()
          }
        })
      }
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
    console.log(34);
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

  doUpdatePackges: function () {
    console.log(123456);
    console.log(arguments);
    wx.cloud.callFunction({
      name: "doUpdatePackages",
      data:{
        billingRef:arguments[0],
        items: arguments[1]
      },
      success: (res) => {
        console.log(res);
      },
      fail: console.error
    })
  },
  doCreateTrackingInfos: function () {
    wx.cloud.callFunction({
      name: "doCreateTrackingInfos",
      data:{
        billingRef:arguments[0],
      },
      success: (res) => {
        console.log(res);
      },
      fail: console.error
    })
  },
  doGetDefaultTrackingLocation: function() {
    wx.cloud.callFunction({
      name: "getDefaultTrackingLocation",
      success: (res) => {
        console.log(res);
        console.log("this ia the response data : " +res.result.data[0]._id);
        this.setData({
          defaultLocationRef: res.result.data[0]._id
        })
        console.log("this ia the location ref : "+this.data.defaultLocationRef)
      },
      fail: console.error
    })
  }
})
