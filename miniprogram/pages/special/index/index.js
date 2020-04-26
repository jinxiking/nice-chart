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
  
      
    activeIndex : '',
   
    bottomList : [],
    page : {
      page : 1,
      pageSize : 20
    },
    finish : false,
  },
  onReachBottom: function () {
    if(this.data.finish){
      return;
    }
    let num = this.data.page.page;
    this.setData({
      page : {
        page : num + 1,
        pageSize : 20
      }
    })
    this.getBottomList();
  },
  onShow:function(){
    var token = wx.getStorageSync('token') || '';
    // 登录过
    if (token) {
      app.globalData.token = token;
      //无需登录也进行授权验证
      this.getSettings(0);
      this.checkUser();
    } else {
      this.doLogin();
    }
    this.setData({
      bottomList : [],
      page : {
        page : 1,
        pageSize : 20
      },
      finish : false,
    })
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
            wx.getLocation({
              success :res=>{
                console.log(res)
                app.globalData.latitude = res.latitude;
                app.globalData.longitude = res.longitude;
         
                
              }
            })
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
      url: '/pages/home/detail/index?cloudId=' + e.currentTarget.dataset.vid,
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
      url: '/v1/ybh/type/list',
      method: 'GET',
      data : {
        
        
      },
      fali(res){
        mytag = true;
      },
      success: (res) => {
        mytag = true;
        this.setData({
          dataObj : res.data.list
        })
        
        this.setData({
          activeIndex : res.data.list[0].id
        })
        this.getBottomList(res.data.list[0].id);
        
        
      }
    })
  },
  getBottomList(i){
    util.ajax({
      url: '/v1/ybh/list/' + this.data.activeIndex + '/' + this.data.page.page + '/' + this.data.page.pageSize,
      method: 'GET',
      data : {

        
      },
      success: (res) => {
      
        mytag = true;
        if(!res.data.list){
          return;
        }
        let time = new Date().getTime();
        
        for(var i = 0;i<res.data.list.length;i++){
   
          res.data.list[i].targetTime = time + res.data.list[i].down_time*1000

        }

        let list = this.data.bottomList.concat(res.data.list);

        this.setData({
          bottomList : list
        })

   
        if (res.data.total == 0 || res.data.total  == this.data.page.page){
          this.setData({
            finish : true
          })
        }
  
        
      }
    })
  },
  getBannerList(){
    //本页面逻辑
    this.getTitle();
  },
  setActiveIndex(e){
    this.setData({
      activeIndex : e.currentTarget.dataset.index,
      page : {
        page : 1,
        pageSize : 20
      },
      finish : false,
      
      bottomList : []
     
    })
    this.getBottomList();
  },
  toSearch(){
    wx.navigateTo({
      url: '/pages/special/search/index',
    })
  },
  onShareAppMessage(){
    // app.setShare();

    var shareObj = {
  　　　　title: "云百惠",        
  　　　　path: '/pages/special/welcome/index',      
  　　　　imageUrl: '/images/active/yunbaihui.png',    
  　　}
      
    return shareObj;
    
  }
})