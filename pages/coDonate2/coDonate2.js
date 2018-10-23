// pages/coDonate2/coDonate2.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    finishEdit:false
  },

  publish(){
    var that = this;
    var postData = {
      "StartType": parseInt(that.data.startType),
      "TeamName": that.data.teamName,
      "TotalAmount": parseFloat(that.data.totalMoney),
      "EndTime": that.data.endDate,
      "IsMinDonation": that.data.isMinDonation,
      "MinDonation": parseFloat(that.data.miniMoney),
      "Detail": that.data.remarks,
      "PFID": that.data.id,
      "Id": ""
    }
    wx.showLoading();
    wx.request({
      url: app.globalData.domain + '/DonationTogetherApi/Req_SaveDonationTogether',
      data: postData,
      method: "POST",
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      success: function (res) {
        if (res.data.Return_Code == 1) {
            wx.navigateTo({
              url: '/pages/coDonate3/coDonate3?id=' + res.data.Data,
            })
        }
      }
    })
  },
  
  back(){
    wx.navigateBack({
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    var teamName = options.teamName;
    if (!teamName){
      teamName = ''
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      teamName: teamName,
      id: options.id,
      totalMoney: options.totalMoney,
      miniMoney: options.miniMoney,
      endDate: options.endDate,
      startType: options.startType,
      remarks: options.remarks,
      domainImage: app.globalData.domainImage
    })
    this.getProjectDetail(options.id);
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
        if (res.data.Return_Code == 1) {
          var project = res.data.Data;
          project.cMoney = parseFloat(project.TotalAmount) - parseFloat(project.DonationAmount);
          project.cTime = parseInt((new Date(project.EndTime).getTime() - new Date(project.AddTime).getTime()) / (24 * 60 * 60 * 1000));
          console.log(project)
          that.setData({
            project: project
          })
        }
      }
    })
  },

  saveT: function(){
    
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