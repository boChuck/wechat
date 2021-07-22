// pages/editAddress/editAddress.js
import Notify from '@vant/weapp/notify/notify';

Page({

  /**
   * Page initial data
   */
  data: {
    senderAddresses: {},
    initialSwitchDefault: [],
    initialSwitchSelect: [],
    switchDefault: [],
    switchSelect: [],
    hasSelect: true,
    hasSelect: true,
  },

  onDefaultChange(event){
    console.log(event);
    const newSwitchDefault = this.data.switchDefault;
    for (let index = 0; index < newSwitchDefault.length; index++) {
      newSwitchDefault[index] = false;
    }
    newSwitchDefault[event.currentTarget.id] = event.detail;
    this.setData({
      switchDefault : newSwitchDefault
    })
    for (let index = 0; index < newSwitchDefault.length; index++) {
      if (newSwitchDefault[index]){
        this.setData({
          hasDefault : true,
        })
        break;
      }
      else {
        this.setData({
          hasDefault : false,
        })
      }
    }
  },
  onUsedChange(event){
    const newSwitchSelect = this.data.switchSelect;
    for (let index = 0; index < newSwitchSelect.length; index++) {
      newSwitchSelect[index] = false;
    }
    newSwitchSelect[event.currentTarget.id] = event.detail;
    this.setData({
      switchSelect : newSwitchSelect
    })
    for (let index = 0; index < newSwitchSelect.length; index++) {
      if (newSwitchSelect[index]){
        this.setData({
          hasSelect : true,
        })
        break;
      }
      else {
        this.setData({
          hasSelect : false,
        })
      }
    }
    if(!this.data.hasSelect){
      Notify({ type: 'danger', message: '请选择要是用的地址' });
    }
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "getSenderAddresses",
      success: (res) => {
        console.log(res.result.data);
        this.setData({
          senderAddresses: res.result.data
        })
        for (let index = 0; index < res.result.data.length; index++) {
          const element = res.result.data[index];
          this.setData({
            switchDefault : this.data.switchDefault.concat(element.isDefault),
            switchSelect : this.data.switchSelect.concat(element.isUsed),
            initialSwitchDefault: this.data.switchDefault.concat(element.isDefault),
            initialSwitchSelect: this.data.switchSelect.concat(element.isUsed),
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
  arrayEquals: function (a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  },

  onUnload: function () {
    console.log(88888);
    // update default setting
    if (this.arrayEquals(this.data.initialSwitchDefault, this.data.switchDefault) &&
        this.arrayEquals(this.data.initialSwitchSelect, this.data.switchSelect)){
          console.log(777);
      }
    else
    {
      console.log(999);
      for (let index = 0; index < this.data.senderAddresses.length; index++) {
        const element = this.data.senderAddresses[index];
        wx.cloud.callFunction({
          name: "updateDefaultSettingForAddress",
          data:{
            itemId: element._id,
            isDefault: this.data.switchDefault[index],
            isSelect:  this.data.switchSelect[index]
          },
          success: (res) => {
            console.log("done");
          },
          fail: console.error,
          complete:(res)=>{
          }
        })
      }
    }
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