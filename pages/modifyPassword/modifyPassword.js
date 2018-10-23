// pages/modifyPassword/modifyPassword.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  savePassword: function(e){
    var OldPassword = e.detail.value.OldPassword;
    var NewPassword = e.detail.value.NewPassword;
    var ConfirmPassword = e.detail.value.ConfirmPassword;

    if (!OldPassword){
      wx.showModal({
        title: '提示',
        content: '请输入旧密码',
        showCancel: false
      })
      return;
    }

    if (!NewPassword) {
      wx.showModal({
        title: '提示',
        content: '请输入新密码',
        showCancel: false
      })
      return;
    }

    if (NewPassword != ConfirmPassword) {
      wx.showModal({
        title: '提示',
        content: '确认密码不正确',
        showCancel: false
      })
      return;
    }

    wx.showLoading();

    var that = this;
    var postData = {
      "OldPassword": OldPassword,
      "NewPassword": NewPassword,
      "ConfirmPassword": ConfirmPassword
    };
    wx.request({
      url: app.globalData.domain + '/UserApi/Req_ModifyPassword',
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
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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