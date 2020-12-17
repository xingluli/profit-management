// pages/manage/manageCpns/user-manage/user-manage.js
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
    showAdd:false,
    user_name:'',
    password:''
  },
  lifetimes: {
    created() {

    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    addUser() {
      this.setData({
        showAdd: true,
        user_name:'' ,
        password:''
      })
    },
    onInput1(e){
      this.setData({
        user_name:e.detail.value
      })
    },
    onInput2(e){
      this.setData({
        password:e.detail.value
      })
    },
    onConfirm(){
      const params = {
        user_name:this.data.user_name,
        password:this.data.password
      }
      http({
        url:'/addUser',
        method:'post',
        cookie:wx.getStorageSync('cookie'),
        data:params 
      }).then((res)=>{
        if(res.data.status_code == 0){
          wx.showToast({
            title: '添加成功',
            icon:'none'
          })
        }  
      }).catch((err)=>{
        console.log(err);
        
      })

    },
    onClose(){
      this.setData({ 
        showUpdate: false,
        
      });
    },
  }
})