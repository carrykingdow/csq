// pages/my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  getPersonalTotal: function(UserId) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/UserApi/Req_GetPersonalTotal',
      data: {
        "OrganizationId": app.globalData.OrganizationId,
        "UserId": UserId
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function(res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            MoneyTotal: res.data.Data.MoneyTotal,
            DonationTotal: res.data.Data.DonationTotal
          })
        }
      }
    })
  },

  getPersonalCard: function(UserId) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/UserApi/Req_GetPersonalCardInfo',
      data: {
        "OrganizationId": app.globalData.OrganizationId,
        "UserId": UserId
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "GET",
      success: function(res) {
        if (res.data.Return_Code == 1) {

        }
      }
    })
  },

  getUserInfo: function() {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/UserApi/Req_GetCurrentUserDetail',
      data: {
        "OrganizationId": app.globalData.OrganizationId
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function(res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            userInfo: res.data.Data
          })
          app.globalData.userInfo = res.data.Data;
          that.getPersonalCard(res.data.Data.UserId);
          that.getPersonalTotal(res.data.Data.UserId);
        }
      }
    })
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
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    }
    this.getUserInfo();
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