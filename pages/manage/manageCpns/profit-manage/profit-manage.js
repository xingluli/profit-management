// pages/manage/manageCpns/profit-manage/profit-manage.js
import http from '../../../../network/http'
Component({
  /**
   * 组件的属性列表
   */
  properties: {},


  /**
   * 组件的初始数据
   */
  data: {
    profits: [],
    columns:[],
    currentIndex:0,
    currentValue:''
  },

  lifetimes: {
    created() {   
      //获取利润数据
      const that = this
      that.getProfits()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

    //获取利润
    getProfits(){
      http({
        url: '/getProfitList'
      }).then((res) => {
        const tempData = []
        res.data.data.forEach((item)=>{
          tempData.push('——'+item.gear + '——')
        })
        this.setData({
          columns:tempData,
          profits:res.data.data,
          currentValue:res.data.data[0].value
        })
      }).catch((err) => {
        console.log(err);
      })
    },

    profitCommit() {
      const that = this
      const params = {
        id:this.data.currentIndex + '1',
        value:this.data.currentValue
      }
      
      //发起请求
      http({
        url:'/updateProfit',
        method:'post',
        cookie:wx.getStorageSync('cookie'),
        data:params 
      }).then((res)=>{
        console.log(res);
        
        if(res.data.status_code == 0){
          that.getProfits()
          wx.showToast({
            title: '修改成功',
            icon:'none'
          })
        }
      }).catch((err)=>{
        console.log(err);
        
      })
      
    },
    onChange(event) {
      const {
        picker,
        value,
        index
      } = event.detail;
      this.setData({
        currentIndex:index,
        currentValue:this.data.profits[index].value
      })

      wx.showToast({
          title: `当前值：${value}`,
          icon: 'none'
        }
      )
    },
    onStepperChange(e){
      this.setData({
        currentValue:e.detail
      })
    }
  }
})