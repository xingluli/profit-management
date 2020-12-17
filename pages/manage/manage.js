// pages/manage/manage.js
import http from '../../network/http'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCloak:true,
    userName:'',
    titles:['单条毛利','指导建议','用户管理'],
    currentIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName:wx.getStorageSync('userName')
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  handleClick(e){
    this.setData({
      currentIndex:e.detail.index
    })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.userName == 'admin') {
      this.setData({
        isCloak:false
      })
    } else {
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/operate/operate',
        })
      }, 1000)
      wx.showToast({
        title: '您没有权限!',
        icon: 'none',
      })


    }
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