// pages/billing/billing.js
Page({

  /**
   * Page initial data
   */
  data: {
    billings: [],
    totalBillings: '1',
    haiyunAddress: '广东广州市白云区海运',
    kongyunAddress: '广东广州市白云区空运'
  },
  getDateFormat: function(ts){
    var d = new Date(ts).toISOString().slice(0,10);
    return d;
  },
  copyKongyunAddress: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  copyHaiyunAddress: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  doOpenCostGuide(event){
    console.log("guide");
    wx.navigateTo({
      url: '/pages/costGuide/costGuide',
      success:function(res) {
        console.log("ok",res);
       },      
       fail : function(res){
         console.log("failed",res);
       }
    })
  },
  doOpenQuestion(event){
    console.log("questuin");
    wx.navigateTo({
      url: '/pages/QA/QA',
      success:function(res) {
        console.log("ok",res);
       },      
       fail : function(res){
         console.log("failed",res);
       }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh();
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "getBillings",
      success: (res) => {
        console.log(res.result.data);
        this.setData({
           billings: [],
        })
        for (let index = 0; index < res.result.data.length; index++) {
          const billing = res.result.data[index];
          if(billing.status==0){
            billing.status = "未送达"
          }
          else{
            billing.status = ""
          }
          if(billing.isPaid){
            billing.isPaid = "已付款"
          }
          else{
            billing.isPaid = "未付款"
          }
          billing.createTime = this.getDateFormat(billing.createTime),
          this.setData({
            billings : this.data.billings.concat(billing),
          })
        }
        this.setData({
          totalBillings: res.result.data.length
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
    console.log(666);
    this.onLoad();
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