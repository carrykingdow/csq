// pages/modifyPhone/modifyPhone.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blockSend: false,
    clockNum: 61,
    clockTxt: '发送短信'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone: options.phone
    })
  },

  savePhone: function(e){
    var OldAccount = e.detail.value.OldAccount;
    var NewAccount = e.detail.value.NewAccount;
    var VerificationCode = e.detail.value.code;

    if (!NewAccount) {
      wx.showModal({
        title: '提示',
        content: '请输入新手机号码',
        showCancel: false
      })
      return;
    }

    if (!VerificationCode) {
      wx.showModal({
        title: '提示',
        content: '请输入短信验证码',
        showCancel: false
      })
      return;
    }

    wx.showLoading();

    var that = this;
    var postData = {
      "UserId": app.globalData.userInfo.UserId,
      "OldAccount": OldAccount,
      "NewAccount": NewAccount,
      "VerificationCode": VerificationCode
    }
    wx.request({
      url: app.globalData.domain + '/UserApi/Req_ModifyAccount',
      data: postData,
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          wx.navigateBack({

          })
        }
      },
      complete: function (res) {
        wx.hideLoading();
      }
    })


  },

  getNewPhone: function(e){
    this.setData({
      newPhone: e.detail.value
    })
  },

  sendSms: function (e) {
    var mobile = this.data.newPhone;
    if (!mobile) {
      wx.showModal({
        title: '提示',
        content: '请输入手机号码',
      })
      return;
    }
    var that = this;

    wx.request({
      url: app.globalData.domain + '/CommonApi/Req_SendSMS',
      method: "POST",
      data: {
        OrganizationId: app.globalData.OrganizationId,
        Phone: mobile
      },
      success: function (res) {
        that.setData({
          blockSend: true,
          clockTxt: '秒后重试',
          clockNum: 60
        });
        var timer = setInterval(function () {
          if (that.data.clockNum <= 0) {
            clearInterval(timer);
            return that.setData({
              clockNum: 61,
              blockSend: false,
              clockTxt: '发送短信'
            });
          }
          that.setData({
            clockNum: (that.data.clockNum - 1),
          });
        }, 1000);
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})