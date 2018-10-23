// pages/addAddress/addAddress.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getRegion(e) {
    let rData = e.detail.value.join(" ");
    this.setData({
      regionVal: rData
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    if (id) {
      this.setData({
        id: id
      })
      this.getAddress(id);
    }
  },

  getAddress: function(id) {
    var postData = {
      Id: id
    }
    var that = this;
    wx.showLoading();
    wx.request({
      url: app.globalData.domain + '/AddressApi/Req_GetAddressInfo',
      method: "POST",
      data: postData,
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      success: function(res) {
        if (res.data.Return_Code == 1) {
          var s = res.data.Data.Address.split(" ");
          var regionVal = s[0] + ' ' + s[1] + ' ' + s[2];
          that.setData({
            address: res.data.Data,
            regionVal: regionVal,
            street: s[3]
          })
        }

      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },

  saveAddress: function(e) {
    var UserName = e.detail.value.UserName;
    var UserPhone = e.detail.value.UserPhone;
    var regionVal = this.data.regionVal;
    var Address = e.detail.value.Address;

    if (!UserName) {
      wx.showModal({
        title: '提示',
        content: '请填写姓名',
        showCancel: false
      })
      return;
    }

    if (!UserPhone) {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return;
    }

    if (!regionVal) {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return;
    }

    if (!Address) {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return;
    }

    var that = this;
    var Id = "";
    if(that.data.id){
      Id = that.data.id;
    }
    var postData = {
      "Id": Id,
      "UserName": UserName,
      "UserPhone": UserPhone,
      "AreaCode": 0,
      "IsDefault": this.data.IsDefault,
      "Address": regionVal + ' ' + Address
    };

    wx.showLoading();
    wx.request({
      url: app.globalData.domain + '/AddressApi/Req_SaveAddress',
      method: "POST",
      data: postData,
      header: {
        "Authorization": 'bearer ' + app.globalData.token
      },
      success: function(res) {
        if (res.data.Return_Code == 1) {
          wx.showModal({
            title: '提示',
            content: '提交成功',
            showCancel: false,
            success: function(res) {
              wx.navigateBack({

              })
            }
          })
        }

      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },

  changeDefault: function(e) {
    var val = e.detail.value;
    this.setData({
      IsDefault: val ? 1 : 0
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