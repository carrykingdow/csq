// pages/donateok/donateok.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    pfid: null,
    money: null
  },

  applyBill: function(){
    var that = this;
    var money = that.data.money;
    if(money < 100){
      return;
    }
    wx.navigateTo({
      url: '/pages/invoiceApply/invoiceApply?checkIds=' + that.data.id,
    })
  },

  getProjectDetail: function (id) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_GetPublicFinancingDetail',
      data: {
        OrganizationId: app.globalData.OrganizationId,
        Id: id
      },
      method: "POST",
      success: function (res) {
        var data = res.data.Data;
        that.setData({
          project: data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      pfid:options.pfid,
      money: options.money,
      finType: options.finType,
      domainImage: app.globalData.domainImage
    })
    this.getProjectList(options.pfid);
    this.getProjectDetail(options.pfid);
  },

  certificate: function (e) {
    wx.navigateTo({
      url: '/pages/certificate/certificate?id=' + this.data.id + "&pfid=" + this.data.pfid,
    })
  },

  getProjectList: function () {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_QueryPublicFinancingList',
      data: {
        "OrganizationId": app.globalData.OrganizationId,
        "TypeId": that.data.finType,
        "Status": 0,
        "Order": 0,
        "PageIndex": 1,
        "PageSize": 3,
        "IsMainPageData": 1,
        "QueryAll": 0,
        "CheckStatus": 1,
        "CompletionProgress": -1,
        "ImplementProgress": -1,
        "DType": "pf",
        "TuitionType": 0
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            projectList: res.data.Data.PageData
          })
        }
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