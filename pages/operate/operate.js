// pages/operate/operate.js
import http from '../../network/http'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    addr:'',
    time:'',
    startNum:'',
    purchaseNum:'',
    endNum:'',
    sales:'',
    gear:'1',
    profit:'',
    totalProfit:'',
    show_form:false,
    show_gear:false,
    show_advise:false,
    profits:[],
    result: [],
    adviseList:[],
    selectAdvises:[],
  },

  //各种方法
  // 点击按钮的功能
  addForm(){
    this.setData({
      show_form:true,
      user:'',
      addr:'',
      time:'',
      startNum:'',
      purchaseNum:'',
      endNum:'',
      sales:''
    })
  },
  selectGear(){
    this.setData({
      show_gear:true,
      gear:'1'
    })
  },
  selectAdvise(){
    this.setData({
      show_advise:true,
      result:[]
    })
  },

  // 监听input输入
  onInput_name(e){
    this.setData({
      user:e.detail.value
    })
  },
  onInput_addr(e){
    this.setData({
      addr:e.detail.value
    })
  },onInput_time(e){
    this.setData({
      time:e.detail.value
    })
  },
  onInput_start(e){
    this.setData({
      startNum:e.detail.value
    })
  },onInput_purchase(e){
    this.setData({
      purchaseNum:e.detail.value
    })
  },onInput_end(e){
    this.setData({
      endNum:e.detail.value
    })
  },
  onStepperChange(e){
    this.setData({
      gear:e.detail
    })
  },

  // 获取利润
  getProfits(){
    http({
      url: '/getProfitList'
    }).then((res) => {
      this.setData({
        profits:res.data.data
      })
      }).catch((err) => {
      console.log(err);
    })
  },

  //获取建议
  getAdviseList(){
    http({
      url:'/getContentList'
    }).then((res)=>{
      this.setData({
        adviseList:res.data.data
      })
    })
  },

  // 对话框确定按钮
  onConfirm_form(){
    const temp_start = parseFloat(this.data.startNum) 
    const temp_purchase= parseFloat(this.data.purchaseNum) 
    const temp_end = parseFloat(this.data.endNum) 
    const temp_sales = temp_start + temp_purchase - temp_end 
    this.setData({
      sales:temp_sales + '',
    })
  },
  onConfirm_gear(){
    const index = parseInt(this.data.gear) - 1
    this.setData({
      profit:this.data.profits[index].value,
    })
    const temp_profit = parseFloat(this.data.profit)
    const temp_sales = parseFloat(this.data.sales)
    const temp_totalProfit = temp_profit*temp_sales.toFixed(2)
    console.log(index,temp_profit,temp_sales,temp_totalProfit);
    this.setData({
      totalProfit:temp_totalProfit
    })
  },
 
  onConfirm_advise(){
    const temp_selectAdvises = []
    this.data.result.forEach((value)=>{
      temp_selectAdvises.push(this.data.adviseList[value-1].content)
    })
    
    this.setData({
      selectAdvises:temp_selectAdvises
    })

  },

  onChange(e) {
    this.setData({
      result: e.detail,
    })
  },
    
  //对话框取消按钮
  onClose(){
    this.setData({
      show:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    that.getProfits()
    that.getAdviseList()
    
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