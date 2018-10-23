// pages/myCoDonate/myCoDonate.js
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
    list: []
  },

  getTotal: function(){
    var that = this;
    wx.request({
      url: app.globalData.domain + '/DonationTogetherApi/Req_QueryMyDonationTogether',
      data: {
        "OrganizationId": app.globalData.OrganizationId,
        "UserId": app.globalData.userInfo.UserId,
        "QueryType": "total",
        "PageIndex": 1,
        "PageSize": 10
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            DonationCount: res.data.Data[0].DonationCount,
            DonationMoney: res.data.Data[0].DonationMoney,
            LaunchCount: res.data.Data[0].LaunchCount
          })
        }
      }
    })
  },

  getList: function () {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/DonationTogetherApi/Req_QueryMyDonationTogether',
      data: {
        "OrganizationId": app.globalData.OrganizationId,
        "UserId": app.globalData.userInfo.UserId,
        "QueryType": "list",
        "PageIndex": (that.data.page - 1) * that.data.pageSize,
        "PageSize": that.data.pageSize
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          var list = that.data.list;
          var result = res.data.Data.PageData;
          for (var i = 0; i < result.length; i++) {
            list.push(result[i]);
          }

          that.setData({
            TotalCount: res.data.Data.TotalCount,
            list: list
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTotal();
    this.getList();
    this.setData({
      domainImage: app.globalData.domainImage
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

  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  }
})