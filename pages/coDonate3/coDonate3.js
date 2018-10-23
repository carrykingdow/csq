// pages/coDonate3/coDonate3.js
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
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      id: options.id,
      domainImage: app.globalData.domainImage
    })
    this.getProjectDetail(options.id);
    this.getRecord(options.pfid,options.id);
  },

  getProjectDetail: function (id) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/DonationTogetherApi/Req_GetDonationTogetherDetail',
      data: {
        Id: id
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          var project = res.data.Data;
          console.log(project)
          that.setData({
            project: project
          })
          wx.request({
            url: app.globalData.domain + '/PublicFinancingApi/Req_QueryDonationsList',
            data: {
              OrganizationId: app.globalData.OrganizationId,
              PublicFinancingId: project.PFID,
              FeeSource: id,
              PageIndex: 1,
              PageSize: 10
            },
            method: "POST",
            success: function (res1) {
              if (res1.data.Return_Code == 1) {
                that.setData({
                  recordList: res1.data.Data.PageData
                })
              }
            }
          })
        }
      }
    })
  },
  join: function (event){
    var id = event.currentTarget.dataset.id;
    var pfid = event.currentTarget.dataset.pfid;
    wx.navigateTo({
      url: '/pages/projectDetail/projectDetail?id='+ pfid + "&feesource=" + id,
    })
  },

  getRecord: function (id,feesource) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_QueryDonationsList',
      data: {
        OrganizationId: app.globalData.OrganizationId,
        PublicFinancingId: id,
        FeeSource:feesource,
        PageIndex: 1,
        PageSize: 10
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          var recordList = res.data.Data.PageData;
          that.setData({
            recordList: res.data.Data.PageData
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