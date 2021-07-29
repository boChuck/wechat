//index.js
const app = getApp()
import Toast from '@vant/weapp/toast/toast';

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
    alerts: [],
    isAdminUser: false,
    output: 'no output',
    ratio: '',
    chaibaoCost:  '',
    internationalCargoCost:  '',
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
    wx.cloud.callFunction({
      name: "isAdminUser",
      success: (res) => {
        console.log(res.result.data.length)
        this.setData({
          isAdminUser: res.result.data.length!=0,
        })
      },
      fail: console.error,
      complete:(res)=>{
        console.log(this.data.isAdminUser)
        if(this.data.isAdminUser){
          wx.showLoading({
            title: '加载中...',
          })
          wx.cloud.callFunction({
            name: "getSettings",
            success: (res) => {
              console.log(res.result.data)
              this.setData({
                ratio: res.result.data[0].ratio,
                chaibaoCost: res.result.data[0].chaibaoCost,
                internationalCargoCost: res.result.data[0].internationalCargoCost,
              })
            },
            fail: console.error,
            complete:(res)=>{
              wx.hideLoading()
            }
          })
          wx.hideTabBar()
        }
      }
    })
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
  // admin user functions
  // ###################################################
  // ###################################################
  doUploadAlertsExcel(event){
    let that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        let path = res.tempFiles[0].path;
        console.log("get file", path)
        that.upLoadAlertExcel(path);
      }
    })
  },
  doUploadLocationsExcel(event){
    let that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        let path = res.tempFiles[0].path;
        console.log("get file", path)
        that.upLoadLocationExcel(path);
      }
    })
  },
  doUploadPackagesExcel(event) {
    let that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        let path = res.tempFiles[0].path;
        console.log("get file", path)
        that.upLoadPackageExcel(path);
      }
    })
  },
  upLoadLocationExcel(path) {
    let that= this
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + '.xls',
      filePath: path,
      success: res=>{
        console.log('upload successful', res.fileID)
        that.parseLocationFile(res.fileID)
      },
      fail: err=>{
        console.log("upload failed", err)
      }
    })
  },
  upLoadAlertExcel(path) {
    let that= this
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + '.xls',
      filePath: path,
      success: res=>{
        console.log('upload successful', res.fileID)
        that.parseAlertFile(res.fileID)
      },
      fail: err=>{
        console.log("upload failed", err)
      }
    })
  },
  upLoadPackageExcel(path) {
    let that= this
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + '.xls',
      filePath: path,
      success: res=>{
        console.log('upload successful', res.fileID)
        that.parsePackageFile(res.fileID)
      },
      fail: err=>{
        console.log("upload failed", err)
      }
    })
  },
  parsePackageFile(fieldId) {
    wx.cloud.callFunction({
      name: "packagesExcel",
      data: {
        fileID: fieldId
      },
      success(res) {
        console.log("parse successfully", res)
      },
      fail(res){
        console.log("parse failed", res)
      }
    })
  },
  parseLocationFile(fieldId) {
    wx.cloud.callFunction({
      name: "locationsExcel",
      data: {
        fileID: fieldId
      },
      success(res) {
        console.log("parse successfully", res)
      },
      fail(res){
        console.log("parse failed", res)
      }
    })
  },
  parseAlertFile(fieldId) {
    wx.cloud.callFunction({
      name: "alertsExcel",
      data: {
        fileID: fieldId
      },
      success(res) {
        console.log("parse successfully", res)
      },
      fail(res){
        console.log("parse failed", res)
      }
    })
  },
  doSaveSettings(event) {
    console.log(this.data.ratio);
    wx.cloud.callFunction({
      name: "doSaveSettings",
      data: {
        ratio: this.data.ratio,
        chaibaoCost:  this.data.chaibaoCost,
        internationalCargoCost:  this.data.internationalCargoCost,
      },
      success(res) {
        console.log("save successfully", res)
        Toast.success('已保存');
      },
      fail(res){
        console.log("save failed", res)
      }
    })
  }
})
