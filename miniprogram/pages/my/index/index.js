// miniprogram/pages/my/index/index.js

const util = require('../../../utils/ajax.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail : {
      seckill_num : 0,
      campaign_num : 0,
      consume_num : 0
    }
  },
  onShow : function(){
    this.getDetail();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getDetail(){
    util.ajax({
      url: '/v1/user/userInfo',
      method: 'GET',
      data : {
        
      },
      success: (res) => {
       console.log(res)
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
  }
})