// pages/login/login.js
import http from '../../network/http'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    password: ''
  },


  // 登录方法
  onLogin() {
    if (this.data.userName) {
      const params = {
        user_name: this.data.userName,
        password: this.data.password
      }
      http({
        url: '/login',
        method: 'post',
        data: params
      }).then((res) => {
        if (res.data.status_code == 0 && res.cookies.length != 0) {
          wx.setStorageSync('userName', this.data.userName)
          wx.setStorageSync('cookie', res.header['Set-Cookie'])
          wx.switchTab({
            url: '/pages/operate/operate',
          })
        } else {
          wx.showToast({
            title: res.data.status_msg,
            icon: 'none'
          })
        }

      })
    } else {
      wx.showToast({
        title: '用户名不能为空!',
        icon: 'none'
      })
    }
  },

  // 用户名输入
  userNameInput(e) {

    this.setData({
      userName: e.detail.value
    })
  },

  // 密码输入
  passwordInput(e) {
    this.setData({
      password: e.detail.value
    })
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