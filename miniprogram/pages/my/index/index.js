// miniprogram/pages/my/index/index.js

const util = require('../../../utils/ajax.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail : {
      seckill_num : 0,
      campaign_num : 0,
      consume_num : 0,


    },
    showOneButtonDialog: false,
    oneButton: [{text: '确定'}],
  },
  openConfirm: function () {
    this.setData({
        dialogShow: true
    })
},
tapDialogButton(e) {
    this.setData({
        dialogShow: false,
        showOneButtonDialog: false
    })
},
tapOneDialogButton(e) {
    this.setData({
        showOneButtonDialog: true
    })
},
  onShow : function(){
    this.getDetail();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  toScan(){
    //B端商家扫码确定二维码可用 并且消费
    wx.scanCode({
      success : res=>{
        console.log(res)
        // util.ajax({
        //   url: res.result,
        //   method: 'GET',
        //   data : {
            
        //   },
        //   success: (res) => {
        //     this.setData({
        //       showOneButtonDialog : true
        //     })
        //   }
        // })
        wx.request({
          url:res.result,
          data :{
            
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            token : app.globalData.token
          },
          method : 'get',
          success : res=>{
            if(res.data.code == 200){
              this.setData({
                showOneButtonDialog : true,
                title : '使用成功'
              })
            }else{
              this.setData({
                showOneButtonDialog : true,
                title : '使用失败'
              })
            }
          }
        })
      },
      fail :res=>{
        wx.showToast({
          title: '请扫描正确二维码',
          icon:'none'
        })
      }
    })
  },
  getDetail(){
    util.ajax({
      url: '/v1/user/userInfo',
      method: 'GET',
      data : {
        
      },
      success: (res) => {

       this.setData({
         detail : res.data
       })
      }
    })
  },
 
  toMes(){
    wx.navigateTo({
      url: '/pages/my/mesCenter/index',
    })
  },
  toActive(){
    wx.navigateTo({
      url: '/pages/my/activeList/index',
    })
  },
  toQuestion(){
    wx.navigateTo({
      url: '/pages/my/question/index',
    })
  },
  toCoupon(){
    wx.navigateTo({
      url: '/pages/my/coupon/index',
    })
  },
  toQuestionDetail(){
    wx.navigateTo({
      url: '/pages/my/questionDetail/index',
    })
  },
  toBusiness(){
    wx.navigateTo({
      url: '/pages/my/business/index',
    })
  }
})