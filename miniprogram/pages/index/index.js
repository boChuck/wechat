//index.js
const app = getApp()
import Notify from '@vant/weapp/notify/notify';
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    pendingEdits: {},
    totalPendingEdits: '1',
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl'),
    isRegisteredUser: true,
    haiyunAddress: '广东广州市白云区海运',
    kongyunAddress: '广东广州市白云区空运',
    customerNumber: '',
    contactNumber: '',
    postcode: '',
    alerts: []
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
  doPackageUpdate: function(event) {
    console.log(event);
    let str=JSON.stringify(event.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/package/package?jsonStr='+str,
      success:function(res) {
        console.log("ok",res);
      },      
      fail : function(res){
        console.log("failed",res);
      }
    })
  },
  doCompleteRegistration(event){
    wx.navigateTo({
      url: '/pages/registration/registration',
      success:function(res) {
        console.log("ok",res);
       },      
       fail : function(res){
         console.log("failed",res);
       }
    })
  },
  onLoad: function() {
    wx.stopPullDownRefresh();
  },
  onShow: function () {
    console.log("on show");
    wx.cloud.callFunction({
      name: "isRegisteredUser",
      success: (res) => {
        console.log(res.result.users.data);
        if(res.result.users.data.length==0)
        {
          console.log("hherrrrrr");
          this.setData({
            isRegisteredUser: false
          })
        }
        else
        {
          this.setData({
            isRegisteredUser: true,
            customerName: res.result.users.data[0].name,
            customerNumber: res.result.users.data[0].customerNumber,
          })
          
        }
      },
      fail: console.error,
      complete:(res)=>{
        
      }
    })
  },
  onReady: function () {
    console.log("on ready");
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "getPendingEdits",
      success: (res) => {
        console.log(res.result.data.length);
        this.setData({
          pendingEdits: res.result.data,
          totalPendingEdits: res.result.data.length
        })
      },
      fail: console.error,
      complete:(res)=>{
        wx.setTabBarBadge({
          index:0,
          text: ""+res.result.data.length+""
        })
        wx.hideLoading()
      }
    }) 
    wx.cloud.callFunction({
      name: "getAlerts",
      success: (res) => {
        this.setData({
          alerts: res.result.data,
        })
      },
      fail: console.error,
      complete:(res)=>{
      }
    })
  },
  doCreateBill(event) {
    console.log(888);
    wx.navigateTo({
      url: '/pages/newBill/newBill',
      success:function(res) {
        console.log("ok",res);
       },      
       fail : function(res){
         console.log("failed",res);
       }
    })
  },
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "getPendingEdits",
      success: (res) => {
        console.log(res.result.data.length);
        this.setData({
          pendingEdits: res.result.data,
          totalPendingEdits: res.result.data.length
        })
      },
      fail: console.error,
      complete:(res)=>{
        wx.setTabBarBadge({
          index:0,
          text: ""+res.result.data.length+""
        })
        wx.hideLoading()
      }
    })
  },
// unused functions
//******************************** */
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

})
