// miniprogram/pages/home/index/index.js
let mytag = true;
const util = require('../../../utils/ajax.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    clearTimer : false,
    targetTime : '',
    indicatorDots: false,
    vertical: true,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    current : 0,
    circular : true,
    bannerList : [
      
    ],
    userHave : true,
    typeNow : 0,
    dataObj : {

    },
    activeIndex : 1,
    value : {
      '0' : '未开始',
      '1' : '进行中',
      '2' : '已结束',
    },
    bottomList : []
  },
  onShow:function(){
    var token = wx.getStorageSync('token') || '';
    console.log(token);
    // 登录过
    if (token) {
      app.globalData.token = token;
      //无需登录也进行授权验证
      this.getSettings(0);
      this.checkUser();
    } else {
      this.doLogin();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //需要验证是否是新用户和进行过地址授权
    
    // var token = '123123xddaxxxffafa'

    
  },
  onPageScroll: function(e) {
    // 页面滚动时执行
    // console.log(e.scrollTop)
    let query = wx.createSelectorQuery();
    query.select('#the').boundingClientRect()
    query.select('#the').boundingClientRect((res)=>{
      console.log(res)
    }).exec();
  },
  myLinsterner(){
    //时间到了监听函数重新拉取
    this.getTitle();
  },
  checkUser(){
    
    util.ajax({
      url: '/v1/user/userInfo',
      method: 'GET',
      data : {
        
      },
      success: (res) => {
        if(!res.data.is_upload){
          this.doLogin();
        }
      }
    })
  },
  doLogin: function (done,option) {
    let _this = this;
    wx.login({
      success: res => {
        
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: app.globalData.url + '/v1/user/login',
          data :{
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' //修改此处即可
          },
          method : 'post',
          success : (res)=>{
            if(res.data.code == 200){
              let token = res.data.data.token;
              
              wx.setStorageSync('token', token);
              app.globalData.token = token;
              if(!res.data.data.is_upload){
                //登录成功但是未更新头像和昵称需要去获取
                _this.getSettings(1)  
                _this.setData({
                  userHave : true
                })
              }else{
                //存储过头像和昵称检查是否进行了地理位置授权
                _this.setData({
                  userHave : false
                })
                _this.getSettings(0) 
              }
            }else{
              
            }
           
          } 
        })
      }
    })
  },
  getSettings(num){
    let _this = this;
    
    wx.getSetting({
      success : (res)=>{
        console.log(res)
        if(num == 1){
          //如果已经授权用户信息直接获取

          if(res.authSetting['scope.userInfo'] && res.authSetting['scope.userLocation']){
            wx.getUserInfo({
              success : ress=>{
                //服务端存储用户信息
                wx.request({
                  url: app.globalData.url + '/v1/user/userInfoAdd',
                  data :{
                    userName : ress.userInfo.nickName,
                    avatarUrl : ress.userInfo.avatarUrl
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded', //修改此处即可
                    token : app.globalData.token
                  },
                  method : 'post',
                  success : (res)=>{
                    //可以继续本页面逻辑
                    _this.getBannerList();
                  } 
                })
              }
            })
          }else{
            //存在未授权直接跳转到授权页面
            wx.redirectTo({
              url: '/pages/home/login/index',
            })
          }
        }else{
          //num为0不需要更新用户做更新，只需要验证是否进行对位置授权
          if(res.authSetting['scope.userLocation']){
            //可以继续本页面逻辑
            this.getBannerList();
          }else{
            wx.redirectTo({
              url: '/pages/home/login/index',
            })
          }
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getBannerList();
  },
  //自定义事件
  topDetai(e){
    wx.navigateTo({
      url: '/pages/home/detail/index?id=' + e.currentTarget.dataset.vid,
    })
  },
  bindchange(index){
    this.setData({
      current: index.detail.current
    })
  },
  getTitle(){
    
    if(!mytag){
      return;
    }
    mytag = false;
    util.ajax({
      url: '/v1/seckill/title',
      method: 'GET',
      data : {
        
        
      },
      fali(res){
        mytag = true;
      },
      success: (res) => {
        mytag = true;
        this.setData({
          dataObj : res.data
        })
        let tag = false;
        for(var i in res.data){
          if(res.data[i] == 1){
            this.setData({
              activeIndex : i
            })
            this.getBottomList(i);
            tag = true;
          }
        }
        if(!tag){
          this.getBottomList(1);
        }
        
      }
    })
  },
  getBottomList(i){
    util.ajax({
      url: '/v1/seckill/campaigns/' + i,
      method: 'GET',
      data : {

        
      },
      success: (res) => {
      
        mytag = true;
        this.setData({
          bottomList : res.data
        })
        let time = new Date().getTime();
        if(res.data.length){
          this.setData({
            targetTime : time + res.data[0].down_time*1000
          })
          
        }
  
        
      }
    })
  },
  getBannerList(){
    //本页面逻辑
    this.getTitle();

    util.ajax({
      url: '/v1/banner/2',
      method: 'GET',
      data : {
        type : '2',
      },
      success: (res) => {
        
        this.setData({
          bannerList: res.data
        });
      }
    })
  },
  setActiveIndex(e){
    this.setData({
      activeIndex : e.currentTarget.dataset.index
    })
    this.getBottomList(e.currentTarget.dataset.index);
  }
})