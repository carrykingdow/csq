// pages/customMade/customMade.js
const app = getApp();
Page({

  saveMade: function(e){
    var UserName = e.detail.value.userName;
    var UserPhone = e.detail.value.userPhone;
    var Description = e.detail.value.description;

    if(UserName == ""){
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
        showCancel: false
      })
      return;
    }

    if (UserPhone == "") {
      wx.showModal({
        title: '提示',
        content: '请输入联系方式',
        showCancel: false
      })
      return;
    }

    if (Description == "") {
      wx.showModal({
        title: '提示',
        content: '请输入需求描述',
        showCancel: false
      })
      return;
    }

    wx.showLoading();

    wx.request({
      url: app.globalData.domain + '/ProjectCustomizationApi/Req_SaveProjectCustomization',
      method: "POST",
      data: {
        OrganizationId: app.globalData.OrganizationId,
        UserName: UserName,
        UserPhone: UserPhone,
        Description: Description
      },
      success: function (res) {
        if (res.data.Return_Code == 1) {
          wx.showModal({
            title: '提示',
            content: '提交成功',
          })
        }

      },
      complete: function(){
        wx.hideLoading()
      }
    })
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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