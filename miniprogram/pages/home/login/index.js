// miniprogram/pages/home/login/index.js
//这个页面主要是为了监督授权。如果所有的都授权了  就跳转去首页 不然就在这里呆着好了 闭关
const app = getApp();
const util = require('../../../utils/ajax.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    localBtn : false,
    userBtn : false,
    userHave : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //验证授权信息
    
    //弹出定位授权
    this.getLocationNow();

    this.getSettings();

    this.checkUser();

  },
  checkUser(){
    util.ajax({
      url: '/v1/user/userInfo',
      method: 'GET',
      data : {
        
      },
      success: (res) => {
        if(res.data.is_upload){
          this.setData({
            userHave : false
          })
        }else{
      
          this.setData({
            userHave : true
          })
        }
       
      }
    })
  },
  opensetting(e){
    wx.openSetting({
      complete: (res) => {
        this.getLocationNow();
      },
    })
    
  },
  getSettings(){
    let _this = this;
    wx.getSetting({
      success : (res)=>{
        console.log(res)
        if(!res.authSetting['scope.userInfo'] ){
          this.setData({
            userBtn : true
          })
        }else{
          
          this.setData({
            userBtn : false
          })
        }
        
        if(!res.authSetting['scope.userLocation'] ){
          this.setData({
            localBtn : true
          })
        }else{
          this.setData({
            localBtn : false
          })
        }

        if(res.authSetting['scope.userLocation'] && (res.authSetting['scope.userInfo'] || !this.data.userHave)){
          wx.switchTab({
            url: '/pages/home/index/index',
          })
        }
      }
    })
  },

  getLocationNow(){
    let _this = this;
    //位置授权
    wx.getLocation({
      success :res=>{
        console.log(res)
        app.globalData.latitude = res.latitude;
        app.globalData.longitude = res.longitude;
        setTimeout(()=>{
          _this.getSettings();
        },100)
        
      }
    })
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
    if(wx.canIUse('hideHomeButton')){
      wx.hideHomeButton()
    }
  },

  getUserInfo(e){
    if(e.detail.userInfo){
      //授权成功
      wx.request({
        url: app.globalData.url + '/v1/user/userInfoAdd',
        data :{
          userName : e.detail.userInfo.nickName,
          avatarUrl : e.detail.userInfo.avatarUrl
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded', //修改此处即可
          token : app.globalData.token
        },
        method : 'post',
        success : (res)=>{
          this.getSettings();
        } 
      })
    }else{
      //未授权不作处理

    }

  }
})