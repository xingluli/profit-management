// pages/operate/operate.js
import http from '../../network/http'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    addr: '',
    time: '',
    startNum: '',
    purchaseNum: '',
    endNum: '',
    sales: '',
    gear: '1',
    profit: '',
    advise_str: '',
    totalProfit: '',
    show_form: false,
    show_gear: false,
    show_advise: false,
    profits: [],
    result: [],
    adviseList: [],
    selectAdvises: [],
    template: {},
    image: '',
    isShow: false,
  },
  //各种方法
  format_str(str) {
    let new_str = ''
    for (let i = 0; i < str.length; i++) {
      if (i == 10 || i == 21 || i == 32) {
        new_str += str[i] + '\n'
      } else {
        new_str += str[i]
      }
    }
    return new_str
  },
  //分享功能
  onImgOK(e) {
    wx.hideLoading()
    this.setData({
      image: e.detail.path,
      show_share: false,
    })
  },

  getDraw() {
    const that = this
    this.setData({
      isShow: true,
    })
    wx.showLoading({
      title: '正在努力生成中',
    })
    this.setData({
      template: {
        width: '750rpx',
        height: '1500rpx',
        background: '#fff',
        views: [
          {
            type: 'image',
            url: '/assets/images/logo.png',
            css: {
              width: '80rpx',
              height: '80rpx',
              top: '40rpx',
              left: '180rpx',
            },
          },
          {
            type: 'text',
            text: '客户盈利微模型',
            css: {
              left: '280rpx',
              top: '60rpx',
              fontSize: '30rpx',
              color: '#209D4B',
            },
          },
          //姓名
          {
            type: 'text',
            text: '姓       名:',
            css: {
              left: '50rpx',
              top: '150rpx',
              fontSize: '35rpx',
            },
          },
          {
            type: 'text',
            text: this.data.user.toString(),
            css: {
              left: '220rpx',
              top: '150rpx',
              fontSize: '35rpx',
            },
          },
          //时间
          {
            type: 'text',
            text: '时       间:',
            css: {
              left: '50rpx',
              fontSize: '35rpx',
              top: '210rpx',
            },
          },
          {
            type: 'text',
            text: this.data.time.toString(),
            css: {
              left: '220rpx',
              fontSize: '35rpx',
              top: '210rpx',
            },
          },
          //地址
          {
            type: 'text',
            text: '地       址:',
            css: {
              left: '50rpx',
              fontSize: '35rpx',
              top: '270rpx',
            },
          },
          {
            type: 'text',
            text: that.format_str(this.data.addr),
            css: {
              left: '220rpx',
              fontSize: '35rpx',
              top: '270rpx',
            },
          },
          //   //购进量
          {
            type: 'text',
            text: '购  进  量:',
            css: {
              left: '50rpx',
              fontSize: '35rpx',
              top: '390rpx',
            },
          },
          {
            type: 'text',
            text: this.data.purchaseNum.toString(),
            css: {
              left: '220rpx',
              fontSize: '35rpx',
              top: '390rpx',
            },
          },
          //   //期末库存
          {
            type: 'text',
            text: '期末库存:',
            css: {
              left: '50rpx',
              fontSize: '35rpx',
              top: '450rpx',
            },
          },
          {
            type: 'text',
            text: this.data.endNum.toString(),
            css: {
              left: '220rpx',
              fontSize: '35rpx',
              top: '450rpx',
            },
          },
          //   //期间销量
          {
            type: 'text',
            text: '期间销量:',
            css: {
              left: '50rpx',
              fontSize: '35rpx',
              top: '510rpx',
            },
          },
          {
            type: 'text',
            text: this.data.sales.toString(),
            css: {
              left: '220rpx',
              fontSize: '35rpx',
              top: '510rpx',
            },
          },
          //档位
          {
            type: 'text',
            text: '档       位:',
            css: {
              left: '50rpx',
              fontSize: '35rpx',
              top: '570rpx',
            },
          },
          {
            type: 'text',
            text: this.data.gear.toString(),
            css: {
              left: '220rpx',
              fontSize: '35rpx',
              top: '570rpx',
            },
          },
          //   //单条毛利
          {
            type: 'text',
            text: '单条毛利:',
            css: {
              left: '50rpx',
              fontSize: '35rpx',
              top: '630rpx',
            },
          },
          {
            type: 'text',
            text: this.data.profit.toString(),
            css: {
              left: '220rpx',
              fontSize: '35rpx',
              top: '630rpx',
            },
          },
          //   //毛利总额
          {
            type: 'text',
            text: '毛利总额:',
            css: {
              left: '50rpx',
              fontSize: '35rpx',
              top: '690rpx',
            },
          },
          {
            type: 'text',
            text: this.data.totalProfit.toString(),
            css: {
              left: '220rpx',
              fontSize: '35rpx',
              top: '690rpx',
            },
          },
          //指导建议
          {
            type: 'text',
            text: '指导建议:',
            css: {
              left: '50rpx',
              fontSize: '35rpx',
              top: '750rpx',
            },
          },
          {
            type: 'text',
            text: this.data.advise_str.toString(),
            css: {
              left: '220rpx',
              fontSize: '35rpx',
              top: '750rpx',
            },
          },
        ],
      },
    })
  },
  previewImg() {
    wx.previewImage({
      current: this.data.image,
      urls: [this.data.image],
      success: (res) => {
        this.setData({
          isbox: false,
        })
      },
    })
  },
  onCloseImg() {
    console.log(23)
    this.setData({
      image: '',
      isShow: false,
    })
  },
  logmasg() {},
  // 点击按钮的功能
  addForm() {
    this.setData({
      data: '',
      show_form: true,
      user: '',
      addr: '',
      // time: '',
      startNum: '',
      purchaseNum: '',
      endNum: '',
      sales: '',
    })
  },
  selectGear() {
    this.setData({
      show_gear: true,
      gear: '1',
    })
  },
  selectAdvise() {
    this.setData({
      show_advise: true,
      result: [],
    })
  },

  // 监听input输入
  onInput_name(e) {
    this.setData({
      user: e.detail.value,
    })
  },
  onInput_addr(e) {
    this.setData({
      addr: e.detail.value,
    })
  },
  onInput_time(e) {
    this.setData({
      time: e.detail.value,
    })
  },
  onInput_start(e) {
    this.setData({
      startNum: e.detail.value,
    })
  },
  onInput_purchase(e) {
    this.setData({
      purchaseNum: e.detail.value,
    })
  },
  onInput_end(e) {
    this.setData({
      endNum: e.detail.value,
    })
  },
  onStepperChange(e) {
    this.setData({
      gear: e.detail,
    })
  },

  // 获取利润
  getProfits() {
    http({
      url: '/getProfitList',
    })
      .then((res) => {
        this.setData({
          profits: res.data.data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  //获取建议
  getAdviseList() {
    http({
      url: '/getContentList',
    }).then((res) => {
      this.setData({
        adviseList: res.data.data,
      })
    })
  },

  // 对话框确定按钮
  onConfirm_form() {
    const temp_start = parseFloat(this.data.startNum)
    const temp_purchase = parseFloat(this.data.purchaseNum)
    const temp_end = parseFloat(this.data.endNum)
    const temp_sales = temp_start + temp_purchase - temp_end
    this.setData({
      sales: temp_sales + '',
    })
  },
  onConfirm_gear() {
    const index = parseInt(this.data.gear) - 1
    this.setData({
      profit: this.data.profits[index].value,
    })
    const temp_profit = parseFloat(this.data.profit)
    const temp_sales =
      parseFloat(this.data.sales) > 0 ? parseFloat(this.data.sales) : 0
    const temp_totalProfit = (temp_profit * temp_sales).toFixed(2)
    console.log(index, temp_profit, temp_sales, temp_totalProfit)
    this.setData({
      totalProfit: temp_totalProfit,
    })
  },

  onConfirm_advise() {
    const temp_selectAdvises = []
    let temp_str = ''
    this.data.result.forEach((value) => {
      temp_selectAdvises.push(this.data.adviseList[value - 1].content)
      temp_str += value + '. ' + this.data.adviseList[value - 1].content + '\n'
    })

    this.setData({
      selectAdvises: temp_selectAdvises,
      advise_str: temp_str,
    })
  },

  onChange(e) {
    this.setData({
      result: e.detail,
    })
  },

  //对话框取消按钮
  onClose() {
    this.setData({
      show: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    that.getProfits()
    that.getAdviseList()
    this.setData({
      time:
        new Date().getFullYear() +
        '年' +
        (new Date().getMonth() + 1) +
        '月' +
        new Date().getDate() +
        '日',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
