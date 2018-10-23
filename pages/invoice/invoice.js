// pages/invoice/invoice.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    items: [{
        name: 'USA',
        value: '美国'
      },
      {
        name: 'CHN',
        value: '中国',
        checked: 'true'
      },
      {
        name: 'BRA',
        value: '巴西'
      },
      {
        name: 'JPN',
        value: '日本'
      },
      {
        name: 'ENG',
        value: '英国'
      },
      {
        name: 'TUR',
        value: '法国'
      },
      {
        name: 'USA',
        value: '美国'
      },
      {
        name: 'CHN',
        value: '中国',
        checked: 'true'
      },
      {
        name: 'BRA',
        value: '巴西'
      },
      {
        name: 'JPN',
        value: '日本'
      },
      {
        name: 'ENG',
        value: '英国'
      },
      {
        name: 'TUR',
        value: '法国'
      }, {
        name: 'USA',
        value: '美国'
      },
      {
        name: 'CHN',
        value: '中国',
        checked: 'true'
      },
      {
        name: 'BRA',
        value: '巴西'
      },
      {
        name: 'JPN',
        value: '日本'
      },
      {
        name: 'ENG',
        value: '英国'
      },
      {
        name: 'TUR',
        value: '法国'
      },
    ],
    checkAll: false,
    checkAllBtn: false,
    checkIds: [],
    totalAmount: 0,
    page: 1,
    pageSize: 10,
    noMore: true,
    isLoad: false,
    invoiceList: []
  },
  tab(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  getInvoice: function() {
    var that = this;
    var postData = {
      "PageIndex": (that.data.page - 1) * that.data.pageSize,
      "PageSize": that.data.pageSize
    };
    wx.request({
      url: app.globalData.domain + '/InvoiceApi/Req_QueryMyApplyInvoice',
      data: postData,
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function(res) {
        if (res.data.Return_Code == 1) {
          var invoiceList = that.data.invoiceList;
          var result = res.data.Data.PageData;
          for (var i = 0; i < result.length; i++) {
            invoiceList.push(result[i]);
          }

          that.setData({
            TotalCount: res.data.Data.TotalCount,
            invoiceList: invoiceList
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

  getDonation: function() {
    var that = this;
    var postData = {
      "PageIndex": 1,
      "PageSize": 10,
      "InvoiceStatus": -1
    };
    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_QueryPersonalDonation',
      data: postData,
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function(res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            donationList: res.data.Data.PageData,
            collectListLen: res.data.Data.PageData.length
          })
        }
      }
    })
  },

  applyInvoice: function() {
    var that = this;
    if (this.data.checkIds.length == 0) {
      return;
    }
    var checkIds = this.data.checkIds;
    var c = '';
    for (var i = 0; i < checkIds.length; i++) {
      c = c + checkIds[i] + ',';
    }
    c = c.substring(0, c.length - 1);
    console.log(c)
    wx.navigateTo({
      url: '/pages/invoiceApply/invoiceApply?checkIds=' + c + "&totalAmount=" + that.data.totalAmount,
    })
  },

  checkboxChange: function(e) {
    console.log(e)
    var checkIds = e.detail.value;
    var donationList = this.data.donationList;
    var totalAmount = 0;
    for (var i = 0; i < checkIds.length; i++) {
      for (var j = 0; j < donationList.length; j++) {
        if (checkIds[i] == donationList[j].Id) {
          totalAmount += parseFloat(donationList[j].DonMoney)
        }
      }
    }
    this.setData({
      checkIds: e.detail.value,
      totalAmount: totalAmount
    })
    let arrLen = e.detail.value.length;
    // 如果选中的个数和所有的列表个数相等，表明全部选中
    let collectListLen = this.data.collectListLen;
    if (arrLen == collectListLen) {
      this.setData({
        checkAllBtn: true
      })
    } else {
      this.setData({
        checkAllBtn: false
      })
    }
  },

  checkboxAllChange: function(e) {
    // 根据选中的数组的个数判断是否为全选
    let arrLen = e.detail.value.length;

    if (arrLen > 0) {
      this.setData({
        checkAll: true
      })
    } else {
      this.setData({
        checkAll: false
      })
    }
  },

  loadMore: function () {
    var that = this;
    var isLoad = this.data.isLoad;
    console.log(isLoad)
    if (!isLoad) {
      this.setData({
        page: that.data.page + 1
      });
      this.getInvoice();
    }
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
    this.getInvoice();
    this.getDonation();
    this.setData({
      tabIndex: 0,
      invoiceList: [],
      page: 1
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  }
})