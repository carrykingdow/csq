// pages/userInfo/userInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: ["男", "女", "保密"],
    defaultSex: 0,
    date: "选择出生日期"
  },
  selSex(e) {
    this.setData({
      defaultSex: e.currentTarget.dataset.index
    })
  },
  selDate (e) {
    this.setData({
      date: e.detail.value
    })
  },

  saveUser: function(e){
    var UserName = e.detail.value.UserName;
    if (!UserName){
      wx.showToast({
        icon: 'none',
        title: '请填写昵称',
      })
      return;
    }
    var Sex = this.data.defaultSex + '';
    var Birthday = this.data.date;
    var that = this;
    wx.showLoading();
    wx.login({
      success: res => {
        wx.request({
          url: app.globalData.domain + '/UserApi/Req_SaveUserBaseInfo',
          method: "POST",
          header: {
            "Authorization": 'bearer ' + app.globalData.token
          },
          data: {
            UserName: UserName,
            Sex: Sex,
            Birth: Birthday
          },
          success: function (res) {
            if (res.data.Return_Code == 1) {
              wx.showToast({
                icon: 'none',
                title: '保存成功',
              })
            }

          },
          complete: function (res) {
            wx.hideLoading();
          }
        })
      }
    })

  },

  getUserInfo: function () {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/VolunteerApi/Req_GetVolunteerDetail',
      data: {
        "OrganizationId": app.globalData.OrganizationId,
        "userId": app.globalData.userInfo.UserId
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "GET",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            userInfo: res.data.Data,
            date: res.data.Data.BirthDay,
            defaultSex: res.data.Data.Sex
          })
        }
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.getUserInfo();
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