// pages/invoiceApply/invoiceApply.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deliveryIndex:0
  },

  selWay(e){
    this.setData({
      deliveryIndex:e.currentTarget.dataset.index
    })
  },

  applyInvoice: function(e){
    var Invoicetitle = e.detail.value.Invoicetitle;
    var Invoicemoney = this.data.Invoicemoney;
    var Telephone = "";
    var Addressee = '';
    var Address = '浙江杭州西湖对面';

    if(!Invoicetitle){
      wx.showModal({
        title: '提示',
        content: '请填写发票抬头',
        showCancel: false
      })
      return;
    }

    if (this.data.deliveryIndex != 0) {
      if (!this.data.address) {
        wx.showModal({
          title: '提示',
          content: '请选择地址',
          showCancel: false
        })
        return;
      }else{
        Addressee = this.data.address.UserName;
        Address = this.data.address.Address;
        Telephone = this.data.address.UserPhone
      }
    }

    

    var that = this;
    var postData = {
      "Id": "",
      "Invoicetitle": Invoicetitle,
      "Invoicemoney": Invoicemoney,
      "Address": Address,
      "Addressee": Addressee,
      "Telephone": Telephone,
      "Financeids": that.data.checkIds, //捐款id
      "DistributionType": 0
    };
    wx.request({
      url: app.globalData.domain + '/InvoiceApi/Req_ApplyInvoice',
      data: postData,
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          wx.navigateBack({
            
          })
        }
      }
    })

  },

  selectAddress: function(e){
    wx.navigateTo({
      url: '/pages/addressList/addressList?from=select',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Invoicemoney: options.totalAmount,
      checkIds: options.checkIds
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