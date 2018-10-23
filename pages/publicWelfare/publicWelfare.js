// pages/publicWelfare/publicWelfare.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  setGreetings: function () {
    var time = parseInt(new Date().getHours());
    var greetings = "早上好！";
    if (5 <= time && time <= 11) {
      greetings = "早上好";
    }
    else if (11 < time && time <= 14) {
      greetings = "中午好！";
    }
    else if (14 < time && time <= 18) {
      greetings = "下午好！";
    }
    else {
      greetings = "晚上好！";
    }
    var that = this;
    that.setData({
      Greetings: greetings
    });
  },
  getPersonalTotal: function (UserId) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/UserApi/Req_GetPersonalTotal',
      data: {
        "OrgId": app.globalData.OrganizationId,
        "UserId": UserId
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function(res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            MoneyTotal: res.data.Data.MoneyTotal
          })
        }
      }
    })
  },

  queryPFCirculation: function(UserId) {
    var that = this;
    var postData = {
      UserID: UserId,
      OrganizationID: app.globalData.OrganizationId,
      PageIndex: 1,
      PageSize: 10
    }
    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_QueryPFCirculation',
      data: postData,
      method: "POST",
      success: function(res) {
        if (res.data.Return_Code == 1) {
          var data = res.data.Data.PageData[0];
          console.log(data)
          that.setData({
            HeadImgUrl: domainImage+data.HeadImgUrl,
            UserName: data.UserName
          })
        }
      }
    })
  },

  getDonationGroupByPFID: function(UserId){
    var that = this;
    var postData = {
      UserId: UserId,
      OrganizationId: app.globalData.OrganizationId,
      PageIndex: 1,
      PageSize: 10
    }
    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_QueryDonationGroupByPFID',
      data: postData,
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            donationList: res.data.Data.PageData,
            TotalCount: res.data.Data.TotalCount
          })
        }
      }
    })
  },

  getTotalPFCirculation: function (UserId){
    var that = this;
    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_QueryTotalPFCirculation',
      data: {
        "OrganizationID": app.globalData.OrganizationId,
        "UserId": UserId,
        "PageIndex": 1,
        "PageSize": 10
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            MoneyTotal: res.data.Data.TotalAmount,
            DonationCount: res.data.Data.DonationCount
          })
        }
      }
    })
  },
  getUserDetail: function (UserId) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/UserApi/Req_GetUserDetail',
      data: {
        "UserId": UserId
      },
      method: "Get",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            NickName: res.data.Data.NickName,
            HeadImgURL: res.data.Data.HeadImgURL
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      domainImage: app.globalData.domainImage
    })
    var userId = options.userId;
    //var userId = '153768173700000001';
    //this.queryPFCirculation(userId);
    //this.getPersonalTotal(userId);
    this.getDonationGroupByPFID(userId);
    this.getTotalPFCirculation(userId);
    this.getUserDetail(userId);
    this.setGreetings();
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