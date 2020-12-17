// pages/manage/manageCpns/advise-manage/advise-manage.js
import http from '../../../../network/http'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    adviseList:[],
    showUpdate:false,
    showAdd:false,
    inputValue1:'',
    inputValue2:'',
    currentIndex:''
  },

  lifetimes:{
    created(){
      const that =this
      that.getAdviseList()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取数据，刷新页面
    getAdviseList(){
      http({
        url:'/getContentList'
      }).then((res)=>{
        this.setData({
          adviseList:res.data.data
        })
      })
    },

    onUpdate(e){
      this.setData({
        showUpdate: true,
        inputValue1:e.currentTarget.dataset.content,
        currentIndex:e.currentTarget.dataset.index
      }) 
    },

    //增加建议
    addAdvise(){
      this.setData({
        showAdd: true,
      }) 
    },
    onClose(){
      this.setData({ showUpdate: false });
    },
    onInput1(e){
      this.setData({
        inputValue1:e.detail.value
      })
    },
    //增加建议监听
    onInput2(e){
      this.setData({
        inputValue2:e.detail.value
      })
    },

    onConfirm1(){
      const that = this
      const params = {
        id:this.data.currentIndex,
        content:this.data.inputValue1,
      }
      http({
        url:'/updateContent',
        method:'post',
        cookie:wx.getStorageSync('cookie'),
        data:params 
      }).then((res)=>{
        if(res.data.status_code == 0){
          that.getAdviseList()
          wx.showToast({
            title: '修改成功',
            icon:'none'
          })
        }

      }).catch((err)=>{
        console.log(err);
        
      })
    },
    // 增加建议提交
    onConfirm2(){
      const that = this
      const params = {
        content:this.data.inputValue2,
      }
      http({
        url:'/addContent',
        method:'post',
        cookie:wx.getStorageSync('cookie'),
        data:params 
      }).then((res)=>{
        if(res.data.status_code == 0){
          that.getAdviseList()
          wx.showToast({
            title: '增加成功',
            icon:'none'
          })
        }
        
      }).catch((err)=>{
        console.log(err);
        
      })

    }
  }
})
