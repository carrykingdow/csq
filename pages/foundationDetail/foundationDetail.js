// pages/foundationDetail/foundationDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  showModal(){
    var that = this;
    wx.showModal({
      title:"关于丛善桥",
      content: "丛善桥平台是由浙江省爱心事业基金会发起主办，并委托浙江众善公益事业发展中心运营",
      showCancel:false,
      confirmColor: "#f8592d",
      confirmText:"我知道了"
    })
  },

  getFundDetail: function (Id) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/FundApi/Req_GetFundDetail',
      data: {
        "OrganizationId": app.globalData.OrganizationId,
        "Id": Id
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          var json = [];
          var found = res.data.Data;
          found.AddTime = found.AddTime.split(" ")[0];

          var Management = found.Management;
          if (Management){
            json = JSON.parse(Management);
          }

          that.setData({
            found: found,
            personList: json
          })
        }
      }
    })
  },

  collection: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/CollectionApi/Req_SaveCollection',
      data: {
        OrganizationId: app.globalData.OrganizationId,
        CollectionId: that.data.id,
        CollectionType: 1,
        CollectionTitle: that.data.found.Title,
        CollectionHeadImage: that.data.found.TitleImgURL,
        CollectionDetail: '',
        CollectionUrl: "/pages/fundationDetail/fundationDetail?id=" + that.data.id
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          wx.showModal({
            title: '提示',
            content: '收藏成功',
            showCancel: false
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var Id = options.Id;
    this.getFundDetail(Id);
    this.setData({
      domainImage: app.globalData.domainImage,
      id: options.Id
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