// pages/project/project.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../imgs/project-banner1.png',
      '../../imgs/project-banner1.png',
      '../../imgs/project-banner1.png'
    ],
    category: ["教育/助学", "医疗救助","灾害救助","扶贫就困","爱心助学"],  //项目分类
    navIndex:0,  //默认当前选中的index
    projectList: [],
    categoryList: [],
    page: 1,
    pageSize: 10,
    noMore: true,
    isLoad: false
  },
  // 选择项目分类
  selCategory(e){
    this.setData({
      navIndex:e.currentTarget.dataset.index,
      page: 1,
      noMore: true
    })

    var id = e.currentTarget.dataset.id;
    this.getProject(id);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBanner();
    this.getProjectCategory();
    this.setBannerHeight();
    this.setData({
      domainImage: app.globalData.domainImage
    })
  },
  setBannerHeight:function(){
    var that = this;
    var info = wx.getSystemInfoSync();
    that.setData({
      height: 750*9/16  + 'rpx'
    })
  },
  getProjectCategory: function(){
    var that = this;
    wx.request({
      url: app.globalData.domain + '/CategoryApi/Req_QueryChildrenCategory',
      data: {
        "OrgId": app.globalData.OrganizationId,
        "QueryType": 0,
        "PageIndex": 1,
        "PageSize": 100,
        "Parentkey": "PublicFinancingType",
        "categoryKey": "",
        "IsBackGround": 0
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            categoryList: res.data.Data.PageData
          })

          that.getProject(res.data.Data.PageData[0].CategoryKey);
        }
      }
    })
  },

  getBanner: function () {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_QueryPublicFinancingList',
      data: {
        "OrganizationId": app.globalData.OrganizationId,
        "TypeId": "-1",
        "Status": 0,
        "Order": 0,
        "PageIndex": 1,
        "PageSize": 3,
        "IsMainPageData": 1,
        "QueryAll": 0,
        "CheckStatus": 1,
        "CompletionProgress": -1,
        "ImplementProgress": -1,
        "DType": "pf",
        "TuitionType": 0
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            bannerList: res.data.Data.PageData
          })
        }
      }
    })
  },

  getProject: function(categoryId){
    var that = this;
    this.setData({
      isLoad: true
    })
    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_QueryPublicFinancingList',
      data: {
        "OrganizationId": app.globalData.OrganizationId,
        "TypeId": categoryId,
        "Status": 0,
        "Order": 0,
        "PageIndex": (that.data.page - 1) *  that.data.pageSize,
        "PageSize": that.data.pageSize,
        "IsMainPageData": 1,
        "QueryAll": 0,
        "CheckStatus": 1,
        "CompletionProgress": -1,
        "ImplementProgress": -1,
        "DType": "pf",
        "TuitionType": 0
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          var projectList = that.data.projectList;
          if (that.data.page == 1){
            projectList = [];
          }
          var result = res.data.Data.PageData;
          for(var i = 0; i < result.length; i++){
            projectList.push(result[i]);
          }

          that.setData({
            projectList: projectList
          })

          if (that.data.page > 1 && result.length == 0) {
            that.setData({
              noMore: false
            })
          }
        }
      },
      complete: function(res){
        that.setData({
          isLoad: false
        })
      }
    })
  },

  projectDetail: function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: '/pages/projectDetail/projectDetail?id=' + id,
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
    this.setData({
      page: 1
    });
    wx.showNavigationBarLoading()
    this.getBanner();
    this.getProjectCategory();
    this.setBannerHeight();
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },

  loadMore: function () {
    var that = this;
    var isLoad = this.data.isLoad;
    console.log(isLoad)
    if (!isLoad) {
      this.setData({
        page: that.data.page + 1
      });
      this.getProject();
    }
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