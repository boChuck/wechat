// pages/about/about.js
Page({

  /**
   * Page initial data
   */
  data: {

  },
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
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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