//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerUrl: ["../../imgs/index-banner.jpg", "../../imgs/index-banner.jpg"],
    adList: [],
  },

  getBanner: function() {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/NewsApi/Req_PortalQueryNews',
      data: {
        OrganizationId: app.globalData.OrganizationId,
        SortType: 's',
        PageIndex: 1,
        PageSize: 5,
        TypeText: '小程序首页轮播'
      },
      method: "POST",
      success: function(res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            adList: res.data.Data.PageData
          })
        }
      }
    })
  },
  setBannerHeight: function () {
    var that = this;
    var info = wx.getSystemInfoSync();
    that.setData({
      height: (info.windowHeight) * (750 / info.windowWidth) - 350 + 'rpx'
    })
  },
  onLoad: function() {
    this.setBannerHeight();
    this.getBanner();
    this.setData({
      domainImage: app.globalData.domainImage
    })
  }
})