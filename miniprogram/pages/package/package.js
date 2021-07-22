// pages/package/package.js
Page({

  /**
   * Page initial data
   */
  data: {
    pendingEdit: {},
    packageName: '',
    packageMaterial: '',
    numOfPieces: '',
    price: '',
    totalPrice: '',
    currentItemId: '',
    memo: ''
  },

  doSubmitDetails(event){
    if (this.data.packageName.length != 0 && this.data.numOfPieces.length != 0 &&
      this.data.packageMaterial.length != 0 && this.data.price.length != 0) {
     wx.cloud.callFunction({
       name: "doUpdatePendingEdit",
       data:{
         itemId: this.data.currentItemId,
         packageName: this.data.packageName,
         numOfPieces: this.data.numOfPieces,
         packageMaterial: this.data.packageMaterial,
         price: this.data.price,
         totalPrice: this.data.price * this.data.numOfPieces,
         memo: this.data.memo
       },
       success: (res) => {
         console.log(res.result.data);
       wx.reLaunch({
         url: '/pages/index/index',
       })
       },
       fail: console.error
     })
   }
  },
  doInquery(event){

  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let item=JSON.parse(options.jsonStr);
    console.log(item);
    wx.cloud.callFunction({
      name: "getPendingEditsByUserIDAndItemID",
      data: {
        id: item
      },
      success: (res) => {
        console.log(res.result.data);
        this.setData({
          pendingEdit: res.result.data,
          currentItemId: res.result.data[0]._id
        })
      },
      fail: console.error,
      complete:(res)=>{
        
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

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function (event) {
    console.log(55);
    console.log(this.data.pendingEdit);
    console.log(this.data.currentItemId);
    console.log(this.data.packageName.length);
    console.log(this.data.numOfPieces.length);
    console.log(this.data.packageMaterial.length);
    console.log(this.data.price.length);
    console.log(this.data.totalPrice.length);
    
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

  }
})