// pages/addressList/addressList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideEdit: false
  },

  addAddress: function(){
    wx.navigateTo({
      url: '/pages/addAddress/addAddress',
    })
  },

  editAddress: function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/addAddress/addAddress?id='+id,
    })
  },

  getAddressList: function(){
    var that = this;
    wx.showLoading();
    var postData = {
      PageIndex: 1,
      PageSize: 10
    }
    wx.request({
      url: app.globalData.domain + '/AddressApi/Req_QueryMyAddress',
      method: "POST",
      data: postData,
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      success: function (res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            addressList: res.data.Data
          })
        }

      },
      complete: function () {
        wx.hideLoading()
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.from)
    if(options.from == 'select'){
      this.setData({
        hideEdit: true
      })
    }
    
  },

  selectAddress: function(e){
    var index = e.currentTarget.dataset.index;
    var addressList = this.data.addressList;
    var that = this;

    var pages = getCurrentPages()

    var prevPage = pages[pages.length - 1]  //当前界面

    var prevPage = pages[pages.length - 2]  //上一个页面

    prevPage.setData({
      address: that.data.addressList[index]
    })
    wx.navigateBack({
      
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
    this.getAddressList();
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