const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    checkAll:false,
    checkAllBtn:false,
    checkIds: []
  },
  tab(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index,
      checkIds: []
    })
  },
  // 全选
  checkAll(e){
    // 根据选中的数组的个数判断是否为全选
    let arrLen = e.detail.value.length;

    if (arrLen>0){
      this.setData({
        checkAll: true
      })
    }else{
      this.setData({
        checkAll: false
      })
    }
   
  },
  // 项目收藏选中
  collectCheck(e){
    console.log(e)
    this.setData({
      checkIds: e.detail.value
    })
    let arrLen = e.detail.value.length;
    // 如果选中的个数和所有的列表个数相等，表明全部选中
    let collectListLen = this.data.collectListLen;
    if (arrLen == collectListLen){
      this.setData({
        checkAllBtn: true
      })
    }else{
      this.setData({
        checkAllBtn: false
      })
    }
  },
  // 基金收藏选中
  foundCollectCheck(e){
    this.setData({
      checkIds: e.detail.value
    })
    let arrLen = e.detail.value.length;
    // 如果选中的个数和所有的列表个数相等，表明全部选中
    let foundCollectListLen = this.data.foundCollectListLen;
    if (arrLen == foundCollectListLen) {
      this.setData({
        checkAllBtn: true
      })
    } else {
      this.setData({
        checkAllBtn: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      domainImage: app.globalData.domainImage
    })
  },

  getFoundCollection: function() {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/CollectionApi/Req_QueryMyCollectionByPage',
      data: {
        "OrganizationID": app.globalData.OrganizationId,
        "PageIndex": 1,
        "PageSize": 10,
        "CollectionType": 1
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function(res) {
        console.log(res)
        if (res.data.Return_Code == 1) {
          var data = res.data.Data.PageData;
          var formatedate = require("../../utils/util.js");
          for (var i = 0; i < data.length; i++) {
            data[i].AddTime = formatedate.formatTime(new Date(data[i].AddTime))
          }
          that.setData({
            foundCollectList: data,
            foundCollectListLen:data.length
          })
        }
      }
    })
  },

  getCollection: function() {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/CollectionApi/Req_QueryMyCollectionByPage',
      data: {
        "OrganizationID": app.globalData.OrganizationId,
        "PageIndex": 1,
        "PageSize": 10,
        "CollectionType": 0
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function(res) {
        console.log("getCollection",res)
        if (res.data.Return_Code == 1) {
          var data = res.data.Data.PageData;
          var formatedate = require("../../utils/util.js");
          for (var i = 0; i < data.length; i++) {
            data[i].AddTime = formatedate.formatTime(new Date(data[i].AddTime))
          }
          that.setData({
            collectList: data,
            collectListLen: data.length
          })
        }
      }
    })
  },

  removeC: function(e){
    var checkIds = this.data.checkIds;
    if (checkIds.length == 0){
      
      return;
    }
    var that = this;
    wx.request({
      url: app.globalData.domain + '/CollectionApi/Req_RemoveCollection',
      data: {
        Lst_Id: that.data.checkIds
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          this.setData({
            checkIds: []
          })
          that.getCollection();
        }
      }
    })
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
    this.getCollection();
    this.getFoundCollection();
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