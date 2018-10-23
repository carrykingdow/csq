// pages/myLove/myLove.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLay: false,
    selMoneyIndex: 0,
    itemIndex: 0,
    page: 1,
    pageSize: 10,
    noMore: true,
    isLoad: false,
    list: []
  },
  // 捐款
  donateMoney() {

    this.setData({
      showLay: true
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.getTotalPFCirculation();
    this.getPFCirculation();
    this.setGreetings();
    this.getOpenId();
  },

  getPFCirculation: function () {
    var that = this;
    this.setData({
      isLoad: true
    })
    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_QueryPFCirculation',
      data: {
        "OrganizationID": app.globalData.OrganizationId,
        "UserId": app.globalData.userInfo.UserId,
        "PageIndex": (that.data.page - 1) * that.data.pageSize,
        "PageSize": that.data.pageSize,
        "PublicFinacingID": "153820441700000001",
        "QueryAll":0,
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
debugger;
          var list = that.data.list;
          var result = res.data.Data.PageData;
          for (var i = 0; i < result.length; i++) {
            list.push(result[i]);
          }

          that.setData({
            TotalCount: res.data.Data.TotalCount,
            list: list
          })

          if (that.data.page > 1 && result.length == 0) {
            that.setData({
              noMore: false
            })
          }
        }
      },
      complete: function (res) {
        that.setData({
          isLoad: false
        })
      }
    })
  },
  setGreetings: function () {
    var time = parseInt(new Date().getHours());
    var greetings = "早上好！";
    if (5 <= time && time <= 11) {
      greetings = "早上好";
    }
    else if (11 < time && time <= 14) {
      greetings = "中午好！";
    }
    else if (14 < time && time <= 18) {
      greetings = "下午好！";
    }
    else {
      greetings = "晚上好！";
    }
    var that = this;
    that.setData({
      Greetings: greetings
    });
  },
  getTotalPFCirculation: function () {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_QueryTotalPFCirculation',
      data: {
        "OrganizationID": app.globalData.OrganizationId,
        "UserId": app.globalData.userInfo.UserId,
        "PageIndex": 1,
        "PageSize": 10,
        "PublicFinacingID": "153820441700000001",
        "QueryType":0
      },
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          that.setData({
            TotalAmount: res.data.Data.TotalAmount
          })
        }
      }
    })
  },

  tabItem: function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    this.setData({
      itemIndex: id
    })
  },
  // 关闭弹窗
  closeLayer() {
    this.setData({
      showLay: false
    })
  },

  loadMore: function () {
    var that = this;
    var isLoad = this.data.isLoad;
    console.log(isLoad)
    if (!isLoad) {
      this.setData({
        page: that.data.page + 1
      });
      this.getPFCirculation();
    }
  },

  getOpenId: function () {
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: app.globalData.domain + '/MiniProgramApi/Req_MiniProgramOpenId',
          method: "POST",
          data: {
            Code: res.code,
            OrganizationId: app.globalData.OrganizationId
          },
          success: function (res) {
            console.log(res);
            if (res.data.Success) {
              that.setData({
                openid: res.data.Data
              })
            }
          }
        })
      }
    })
  },

  donation: function (e) {
    var that = this;
    var Message = '加油';
    var DonMoney = "20";
    var itemIndex = this.data.itemIndex;
    if (itemIndex == 1) {
      DonMoney = "50";
    } else if (itemIndex == 2) {
      DonMoney = "100";
    } else if (itemIndex == 3) {
      var money = e.detail.value.DonMoney;
      if (!money) {
        wx.showModal({
          title: '提示',
          content: '请输入捐款金额',
          showCancel: false
        })
        return;
      }
      DonMoney = money;
    }

    var postData = {
      "FinancingId": '153820441700000001',
      "DonorName": app.globalData.userInfo.NickName,
      "Message": Message,
      "Address": "无",
      "ExpressInfo": "",
      "PayType": 3,
      "SemesterId": "",
      "OpenId": this.data.openid,
      "UserHeadImage": "",
      "DonMoney": DonMoney,
      "Account": app.globalData.userInfo.Account,
      "TeamId": app.globalData.userInfo.TeamId,
      "FeeSource": "0"
    }

    wx.request({
      url: app.globalData.domain + '/PublicFinancingApi/Req_SavePFDonation',
      data: postData,
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.data.Return_Code == 1) {
          wx.requestPayment({
            timeStamp: res.data.Data.TimeStamp,
            nonceStr: res.data.Data.NonceStr,
            package: res.data.Data.Package,
            signType: 'MD5',
            paySign: res.data.Data.PaySign,
            fail: function (resp) {
              wx.showToast({
                icon: 'none',
                title: '支付失败'
              })
            },
            success: function (resp) {
              that.setData({
                list: [],
                page: 1,
                showLay: false
              })
              that.getPFCirculation();
            }
          })

        } else {
          wx.showModal({
            title: '提示',
            content: res.data.Return_Msg,
            showCancel: false
          })
        }
      }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  }
})