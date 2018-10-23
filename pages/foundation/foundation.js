// pages/foundation/foundation.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 10,
    noMore: true,
    isLoad: false,
    foundList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Title: options.Title
    })
    this.getFund();
  },

  getFund: function(){
    var that = this;
    this.setData({
      isLoad: true
    })
    wx.request({
      url: app.globalData.domain + '/FundApi/Req_QueryFundList',
      data: {
        "OrganizationId": app.globalData.OrganizationId,
        "TypeId": -1,
        "Title": that.data.Title,
        "Status": 0,
        "Order": 0,
        "TeamId": "",
        "PageIndex": (that.data.page - 1) * that.data.pageSize,
        "PageSize": that.data.pageSize,
        "IsMainPageData": 0,
        "QueryAll": 0,
        "UserId": "",
        "DType": "found",
        "CheckStatus": 1,
        "ImplementProgress": -1,
        "ChargePersonID": "",
        "Recommend": "",
        "VirtualCloud": ""
      },
      method: "POST",
      success: function (res) {
        console.log(res.data.Data.PageData)
        if (res.data.Return_Code == 1){
          var foundList = that.data.foundList;
          var result = res.data.Data.PageData;
          for (var i = 0; i < result.length; i++) {
            result[i].AddTime = result[i].AddTime.split(" ")[0];
            foundList.push(result[i]);
          }
          
          that.setData({
            foundList: foundList
          })

          if (that.data.page > 1 && result.length == 0) {
            that.setData({
              noMore: false
            })
          }
        }
        
      }
    })

  },

  loadMore: function () {
    var that = this;
    var isLoad = this.data.isLoad;
    console.log(isLoad)
    if (!isLoad) {
      this.setData({
        page: that.data.page + 1
      });
      this.getFund();
    }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  }
})