// pages/home/home.js
Page({

  /**
   * Page initial data
   */
  data: {
    isExistingUser: false,
    isLoadingFinished: false,
    avatarUrl: '',
    nickname: '',
    gender: '',
    country: '',
    province: '',
    signature: '',
  },

  doStart(event) {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
           avatarUrl: res.userInfo.avatarUrl,
           nickname: res.userInfo.nickName,
           gender: res.userInfo.gender,
           country: res.userInfo.country,
           province: res.userInfo.province,
           signature: res.signature
        })
        wx.showLoading({
          title: '加载中...',
        })
        wx.cloud.callFunction({
          name: "addUser",
          data: {
            avatarUrl: this.data.avatarUrl,
            nickname: this.data.nickname,
            gender: this.data.gender,
            country: this.data.country, 
            province: this.data.province,
            signature: this.data.signature
          },
          success: (res) => {
            console.log(res);
          },
          fail: (res)=>{
            wx.hideLoading();
          },
          complete:(res)=>{
            wx.hideLoading();
            this.onLoad();
          }
        })
      },
      fail: console.error,
      complete:(res)=>{
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "isExistingUser",
      success: (res) => {
        console.log(res.result.users.data.length);
        if(res.result.users.data.length==0)
        {
        }
        else{
          console.log("test");
          this.setData({
            isExistingUser: true,
          })
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      },
      fail: console.error,
      complete:(res)=>{
        this.setData({
          isLoadingFinished: true,
        })
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