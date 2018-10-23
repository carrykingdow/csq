// pages/coDonate/coDonate.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeCur: 0,
    limitMoney: 0,
    endDate: ""
  },
  selType(e) {
    this.setData({
      typeCur: e.currentTarget.dataset.index
    })
  },
  selLimitMoney(e) {
    this.setData({
      limitMoney: e.currentTarget.dataset.index
    })
  },
  selEndDate(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    this.setData({
      id: id
    })
    this.getProjectDetail(id);
    this.setData({
      domainImage: app.globalData.domainImage
    })
  },

  getProjectDetail: function(id) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_GetPublicFinancingDetail',
      data: {
        OrganizationId: app.globalData.OrganizationId,
        Id: id
      },
      method: "POST",
      success: function(res) {
        if (res.data.Return_Code == 1) {
          var project = res.data.Data;
          project.cMoney = parseFloat(project.TotalAmount) - parseFloat(project.DonationAmount);
          project.cTime = parseInt((new Date(project.EndTime).getTime() - new Date(project.AddTime).getTime()) / (24 * 60 * 60 * 1000));
          project.cTime = project.cTime <= 0 ? 0 : project.cTime;
          console.log(project)
          that.setData({
            project: project
          })
        }
      }
    })
  },

  next: function(e) {
    console.log(e)
    var that = this;
    var teamName = '';
    var totalMoney = e.detail.value.totalMoney;
    var miniMoney = '';
    var remarks = e.detail.value.remarks;
    var endDate = that.data.endDate;
    if (that.data.typeCur == 1){
      teamName = e.detail.value.teamName;
      if (teamName == "") {
        wx.showToast({
          icon: 'none',
          title: '请填写团队名称',
        })
        return;
      }
    }

    if (totalMoney == "") {
      wx.showToast({
        icon: 'none',
        title: '请填写筹款目标',
      })
      return;
    }

    if(endDate == ""){
      wx.showToast({
        icon: 'none',
        title: '请选择截止日期',
      })
      return;
    }

    var isMinDonation = this.data.limitMoney;
    if (isMinDonation == 0){
      miniMoney = e.detail.value.miniMoney;
      if (!miniMoney){
        wx.showToast({
          icon: 'none',
          title: '请填写最低起捐金额',
        })
        return;
      }
    }

    console.log(remarks);

    wx.navigateTo({
      url: '/pages/coDonate2/coDonate2?id=' + that.data.id + "&startType=" + that.data.typeCur + "&teamName=" + teamName + "&totalMoney=" + totalMoney + "&isMinDonation=" + isMinDonation + "&miniMoney=" + miniMoney + "&remarks=" + remarks + "&endDate=" + that.data.endDate,
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