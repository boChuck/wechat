// pages/Registration/Registration.js
import Notify from '@vant/weapp/notify/notify';




Page({

  /**
   * Page initial data
   */
  data: {
    invalidEmail: false,
    invalidName:false,
    invalidContactNumber: false,
    emailErrorMessage: '',
    agreeChecked: false,
    name:'',
    email:'',
    contactNumber:'',
    showPopup: false
  },
  onAgreeChange(event) {
      this.setData({
        agreeChecked: event.detail,
      });
  },
  validMail: function(mail)
  {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
    {
      return (true)
    }
      return (false)
  },
  agreeUser(event){
    console.log(777);
    wx.navigateTo({
      url: '/pages/userAgreement/userAgreement',
      success:function(res) {
        console.log("ok",res);
       },      
       fail : function(res){
         console.log("failed",res);
       }
    })
  },
  onNameBlur(event){
    console.log(event);
    if(event.detail.value==''){
      this.setData({
        invalidName:true,
      })
    }
  },
  onEmailBlur(event){
    if(event.detail.value==''){
      this.setData({
        invalidEmail:true,
      })
    }
    if(event.detail.value!=''&&!this.validMail(event.detail.value)){
      this.setData({
        invalidEmail:true,
        emailErrorMessage:"请输入正确的Email地址",
      })
    }
  },
  onContactNumberBlur(event){
    if(event.detail.value==''){
      this.setData({
        invalidContactNumber:true,
      })
    }
  },
  onNameInput(event){
    this.setData({
      name:event.detail,
      invalidName:false,
      nameErrorMessage:"",
    })
  },
  onEmailInput(event){
    this.setData({
      email:event.detail,
      invalidEmail:false,
      emailErrorMessage:"",
    })
  },
  onContactNumberInput(event){
    this.setData({
      contactNumber:event.detail,
      invalidContactNumber:false,
      contactNumberErrorMessage:"",
    })
  },
  doSubmitRegistration(event){
  
    if(this.data.invalidContactNumber || 
    this.data.invalidEmail ||
    this.data.invalidName){
        Notify({ type: 'danger', message: '请正确填写你的信息' });
    }
    else{
      wx.showLoading({
        title: '加载中...',
      })
      wx.cloud.callFunction({
        name: "doUpdateUser",
        data:{
          name: this.data.name,
          email: this.data.email,
          contactNumber: this.data.contactNumber,
        },
        success: (res) => {
          console.log(res);
          wx.switchTab({
            url: '/pages/index/index'
          })
        },
        fail: (res)=>{
          console.log(res);
          wx.hideLoading()
        },
        complete:(res)=>{
          wx.hideLoading()
        }
      })
    }
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