//app.js
App({
  onLaunch: function() {
    var that = this;
    that.login(function(res) {
      if (res.code == 0){
        that.getUserInfo();
      }
    });
  },

  login: function(callback) {
    var that = this;
    var token = that.globalData.token;
    if (0 == 1) {
      wx.request({
        url: that.globalData.domain + '/app/checkToken',
        data: {
          token: token
        },
        success: function(res) {
          if (res.data.code != 0) {
            that.globalData.token = null;
            that.login();
          } else {
            callback();
          }
        }
      })
      return;
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: that.globalData.domain + '/MiniProgramApi/Req_MiniProgramLogin',
          method: "POST",
          data: {
            Code: res.code,
            OrganizationId: that.globalData.OrganizationId
          },
          success: function(res) {
            if (res.data.Return_Code == 20) { //未注册
              callback({
                code: 1
              });
              return;
            }

            if (res.data.Return_Code == 1) { //登录成功
              var json = JSON.parse(res.data.Data);
              that.globalData.token = json.access_token;
              callback({
                code: 0
              });
            }

          }
        })
      },
      fail: function(res) {
        console.log(res)
      }

    })
  },

  getUserInfo: function () {
    var that = this;
    wx.request({
      url: that.globalData.domain + '/UserApi/Req_GetCurrentUserDetail',
      data: {
        "OrganizationId": that.globalData.OrganizationId
      },
      header: {
        "Authorization": 'bearer ' + that.globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.Return_Code == 1) {
          that.globalData.userInfo = res.data.Data;
        }
      }
    })
  },

  globalData: {
    domain: "https://tapi.hyejia.org/api",
    //domain: "http://localhost:8080/api",
    token: "",
    OrganizationId: '153591550900000001',
    //OrganizationId: '149920292300000001',
    domainImage: "https://timg.hyejia.org",
    userInfo: null,
  },
})