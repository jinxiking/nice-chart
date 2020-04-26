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
    tel : '',
    choseOpenId : '',
    detailShowTag : true,
    detailShowTagsOpen : true,
    showOneButtonDialog: false,
    oneButton: [{text: '取消'},{text: '确定'}],
  },
  tapDialogButton(e) {
      this.setData({
          dialogShow: false,
          showOneButtonDialog: false
      })
  },
  tapDialogButtonOpen(r){
    if(r.detail.index){
      if(!this.data.tel){
        wx.showToast({
          title: '请输入金额',
        })
        return
      }else{
        //添加用户使用次数
         util.ajax({
          url:'/v1/ybh/add',
          method: 'POST',
          data : {
            open_id : this.data.choseOpenId,
            money : this.data.tel
          },
          success: (ress) => {
            wx.showToast({
              title: '添加成功',
            })
            this.setData({
              detailShowTagsOpen : true,
              tel : ''
            })

          }
        })

      }
    }else{
      this.setData({
        detailShowTagsOpen : true,
        tel : ''
      })
    }
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
        this.setData({
          detailShowTagsOpen : false,
          choseOpenId : res.result
        })
        // util.ajax({
        //   url:'/v1/code/info/' + res.result,
        //   method: 'GET',
        //   data : {
            
        //   },
        //   success: (ress) => {

        //     wx.navigateTo({
        //       url: '/pages/home/detail/index?useId=' + ress.data.id + '&comeId=' + res.result,
        //     })
        //   }
        // })
        // wx.request({
        //   url:res.result,
        //   data :{
            
        //   },
        //   header: {
        //     'content-type': 'application/x-www-form-urlencoded',
        //     token : app.globalData.token
        //   },
        //   method : 'get',
        //   success : res=>{
        //     if(res.data.code == 200){
        //       this.setData({
        //         showOneButtonDialog : true,
        //         title : '使用成功'
        //       })
        //     }else{
        //       this.setData({
        //         showOneButtonDialog : true,
        //         title : '使用失败'
        //       })
        //     }
        //   }
        // })
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
  telInput(value){
    this.setData({
      tel : value.detail.value
    })
  },

  showScan(){
    this.setData({
      detailShowTag : false,
    })    
  },
  closeMask(){
    this.setData({
      detailShowTag : true,
      detailShowTagsOpen : true
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