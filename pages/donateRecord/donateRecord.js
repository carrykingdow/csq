// pages/donateRecord/donateRecord.js
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

  getPFCirculation: function () {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_QueryDonationGroupByPFID',
      data: {
        "OrganizationId": app.globalData.OrganizationId,
        "UserId": app.globalData.userInfo.UserId,
        "PageIndex": (that.data.page - 1) * that.data.pageSize,
        "PageSize": that.data.pageSize
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
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
  setGreetings:function(){
    var time = parseInt(new Date().getHours());
    var greetings = "早上好！";
    if(5 <= time && time <=11)
    {
      greetings = "早上好";
    }
    else if (11 < time && time <= 14)
    {
      greetings = "中午好！";
    }
    else if (14 < time && time <= 18) {
      greetings = "下午好！";
    }
    else
    {
      greetings = "晚上好！";
    }
    var that = this;
    that.setData({
      Greetings:greetings
    });
  },
  getPersonalTotal: function () {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/UserApi/Req_GetPersonalTotal',
      data: {
        "OrganizationId": app.globalData.OrganizationId,
        "UserId": app.globalData.userInfo.UserId
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            MoneyTotal: res.data.Data.MoneyTotal,
            DonationTotal: res.data.Data.DonationTotal
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.getPersonalTotal();
    this.getPFCirculation();
    this.setGreetings();
  },

  loadMore: function () {
    var that = this;
    var isLoad = this.data.isLoad;
    console.log(isLoad)
    if (!isLoad) {
      this.setData({
        page: that.data.page + 1
      });
      this.getPFCirculation();
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