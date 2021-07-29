// pages/about/about.js
Page({

  /**
   * Page initial data
   */
  data: {
    avatarUrl: '',
    nickname: '',
   customerNumber: ''
  },
  getUserProfile() {
    wx.cloud.callFunction({
      name: "isRegisteredUser",
      success: (res) => {
        console.log(res)
        this.setData({
          avatarUrl: res.result.users.data[0].avatarUrl,
          nickname: res.result.users.data[0].nickname,
          customerNumber: res.result.users.data[0].customerNumber,
        })
      },
      fail: (res)=>{
      },
      complete:(res)=>{
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(23);
    this.getUserProfile();
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