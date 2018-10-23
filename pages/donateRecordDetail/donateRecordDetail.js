// pages/donateRecordDetail/donateRecordDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getDetail: function(Id){
    var that = this;
    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_GetPublicFinancingDetail',
      data: {
        "OrganizationId": app.globalData.OrganizationId,
        "Id": Id
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            detail: res.data.Data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Id = options.PFId;
    this.getDetail(Id);
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