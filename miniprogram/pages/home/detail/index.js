// miniprogram/pages/home/detail/index.js
const util = require('../../../utils/ajax.js');
let mytag = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clearTimer : false,
    targetTime : '',
    id : '',
    detail : {},
    eid : '',
    comeId : '',
    cloudId : '' //云百汇专用
  },
  myLinsterner(){
    this.getDetail();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.id){
      this.setData({
        id : options.id
      })
      this.getDetail(options.id);
    }else if(options.useId){
      this.setData({
        eid : options.useId,
        id : options.useId,
        comeId : options.comeId,
      })
      this.getDetail(options.useId);
    }else if(options.cloudId){
      this.setData({
        cloudId : options.cloudId
      })
      this.getCloudDetail(options.cloudId);
    }
   
  },
  getCloudDetail(){
    let _this = this;
    
    util.ajax({
      url: '/v1/ybh/info/' + this.data.cloudId,
      method: 'GET',
      data : {
        
      },
      success: (res) => {
   
        this.setData({
          detail : res.data
        })
      
        if(res.data.count_down){
          let time = new Date().getTime();
          _this.setData({
            targetTime : time + res.data.count_down*1000
          })
          console.log(this.data.targetTime)
          
          
        }
      }
    })
  },
  getDetail(){
    let _this = this;
    
    util.ajax({
      url: '/v1/seckill/campaign/' + this.data.id,
      method: 'GET',
      data : {
        
      },
      success: (res) => {
   
        this.setData({
          detail : res.data
        })
      
        if(res.data.count_down){
          let time = new Date().getTime();
          _this.setData({
            targetTime : time + res.data.count_down*1000
          })
          console.log(this.data.targetTime)
          
          
        }
      }
    })
  },
  submitUse(){
    util.ajax({
      url: '/v1/code/coupons/' + this.data.comeId,
      method: 'GET',
      data : {
        
      },
      success: (res) => {
  
        wx.showToast({
          title: '使用成功',
          icon : 'none'
        })
        setTimeout(()=>{
          wx.navigateBack({
            complete: (res) => {},
          })
        },2000)
      },
      fali : res=>{

      }
    })
  },
  submitYbh(){
    if(mytag){
      return;
    }
    mytag = true;
    util.ajax({
      url: '/v1/ybh/seckill/' + this.data.id,
      method: 'POST',
      data : {
        
      },
      success: (res) => {
        mytag = false;
        wx.showToast({
          title: '秒杀成功',
          icon : 'none'
        })
        setTimeout(()=>{
          wx.navigateBack({
            complete: (res) => {},
          })
        },2000)
      },
      fali : res=>{
        mytag = false;
      }
    })
  },
  submit(){
    if(this.data.is_seckill == 1){
      wx.showToast({
        title: '已经秒杀过',
        icon : 'none'
      })
      return;
    }

    if(this.data.cloudId){
      //云百汇专用提交卡死
      this.submitYbh();
      return;
    }
    if(mytag){
      return;
    }
    mytag = true;
    util.ajax({
      url: '/v1/seckill/' + this.data.id,
      method: 'POST',
      data : {
        
      },
      success: (res) => {
        mytag = false;
        wx.showToast({
          title: '秒杀成功',
          icon : 'none'
        })
        setTimeout(()=>{
          wx.navigateBack({
            complete: (res) => {},
          })
        },2000)
      },
      fali : res=>{
        mytag = false;
      }
    })

  },
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