// pages/editAddress/editAddress.js
Page({

  /**
   * Page initial data
   */
  data: {
    addressDescription: '',
    firstname: '',
    surname: '',
    contactNumber: '',
    street: '',
    area: '',
    city: '',
    country: '',
    postcode: '',
    currentItemId: '',
    isEditingReceiver: false,
    isEditingSender: false,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options.jsonStr);
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: "getSelectedAddress",
      data: {
        id: options.jsonStr
      },
      success: (res) => {
        this.setData({
          currentItemId: res.result.selectedAddress.data[0]._id,
          addressDescription: res.result.selectedAddress.data[0].addressDescription,
          firstname: res.result.selectedAddress.data[0].firstname,
          surname: res.result.selectedAddress.data[0].surname,
          contactNumber: res.result.selectedAddress.data[0].contactNumber,
          street: res.result.selectedAddress.data[0].street,
          area: res.result.selectedAddress.data[0].area,
          city: res.result.selectedAddress.data[0].city,
          country: res.result.selectedAddress.data[0].country,
          postcode: res.result.selectedAddress.data[0].postcode,
          isEditingReceiver: res.result.selectedAddress.data[0].isReceiver,
          isEditingSender: res.result.selectedAddress.data[0].isSender
        })
      },
      fail: (res)=>{
        wx.hideLoading()
      },
      complete:(res)=>{
        wx.hideLoading()
      }
    })
  },
  doSaveAddress(event) {
    wx.cloud.callFunction({
      name: "doUpdateAddress",
      data:{
        itemId: this.data.currentItemId,
        addressDescription: this.data.addressDescription,
        firstname:  this.data.firstname,
        surname:  this.data.surname,
        contactNumber:  this.data.contactNumber,
        street:  this.data.street,
        area:  this.data.area,
        city:  this.data.city,
        country:  this.data.country,
        postcode:  this.data.postcode
      },
      success: (res) => {
        console.log(res.result.data);
        if(this.data.isEditingReceiver){
          wx.navigateBack({
            url: '/pages/manageReceiverAddress/manageReceiverAddress',
          })
        }
        else
        {
          wx.navigateBack({
            url: '/pages/manageSenderAddress/manageSenderAddress',
          })
        }
      },
      fail: console.error
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