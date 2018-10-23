// pages/queryOnline/queryOnline.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryIndex: 0,
    showCode: false,
    blockSend: false,
    clockNum: 61,
    clockTxt: '发送短信'
  },
  selQuery(e) {
    this.setData({
      queryIndex: e.currentTarget.dataset.index
    })
  },

  mobileInput: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  sendSms: function(e) {
    if (this.data.blockSend) {
      return;
    }
    var mobile = this.data.mobile;
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
      success: function(res) {
        console.log(res);
        if (res.data.Return_Code == 1) {
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
        }else{
          wx.showToast({
            icon: 'none',
            title: '发送短信验证码失败',
          })
        }

      }
    })

  },

  getMobile: function(e) {
    console.log(e);
    var encryptedData = e.detail.encryptedData;
    var errMsg = e.detail.errMsg;
    var iv = e.detail.iv;
    if ("getPhoneNumber:ok" != errMsg) {
      this.setData({
        showCode: true
      })
      return;
    }

    var that = this;

    wx.login({
      success: res => {
        wx.request({
          url: app.globalData.domain + '/MiniProgramApi/Req_MiniProgramGetTelphone',
          method: "POST",
          data: {
            OrganizationId: app.globalData.OrganizationId,
            EncryptedData: encryptedData,
            IV: iv,
            Code: res.code
          },
          success: function(res) {
            console.log(res);
            var mobile = res.data.Data.Telphone;
            that.setData({
              mobile: mobile
            })
          }
        })
      }
    })
  },

  query: function(e) {
    
    var mobile = e.detail.value.mobile;
    var code = e.detail.value.code;
    var nickname = e.detail.value.nickname;

    if(nickname == ""){
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
        showCancel: false
      })
      return;
    }
    if (mobile == "") {
      wx.showModal({
        title: '提示',
        content: '请输入手机号码',
        showCancel: false
      })
      return;
    }

    if(this.data.showCode){
      if (code == ""){
        wx.showModal({
          title: '提示',
          content: '请输入验证码',
          showCancel: false
        })
        return;
      }
    }

    var that = this;
    wx.showLoading();
    wx.request({
      url: app.globalData.domain + '/MiniProgramApi/Req_MiniProgramLogin',
      method: "POST",
      data: {
        OrganizationId: app.globalData.OrganizationId,
        Account: mobile,
        SMSCode: code,
        NickName: nickname,
        IsBind: 0
      },
      success: function(res) {
        if (res.data.Return_Code == 1) {
          wx.navigateTo({
            url: '/pages/publicWelfare/publicWelfare?userId=' + res.data.Data.Id,
          });
        }

      },
      complete: function(res){
        wx.hideLoading();
      }
    })

  },

  queryFound: function(e){
    var Title = e.detail.value.Title;
    wx.navigateTo({
      url: '/pages/foundation/foundation?Title=' + Title,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})