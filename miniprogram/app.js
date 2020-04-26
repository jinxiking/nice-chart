//app.js
let flag = false;
App({
  onLaunch: function () {
    var token = wx.getStorageSync('token') || '';
    // 登录过
    if (token) {
      this.globalData.token = token;
    }
  },
  getLocationNow(){
    let _this = this;
    wx.getLocation({
      success :res=>{
        _this.globalData.latitude = res.latitude;
        _this.globalData.longitude = res.longitude;
      }
    })
  },
  doLogin: function (done,option) {
    let _this = this;
    if(flag){
      return;
    }
    flag = true
    wx.login({
      success: res => {
        
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.url + '/v1/user/login',
          data :{
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' //修改此处即可
          },
          method : 'post',
          success : (res)=>{
   
            flag = false;
            if(res.data.code == 200){
              let token = res.data.data.token;
         
              wx.setStorageSync('token', token);
              _this.globalData.token = token;

              if(res.data.data.is_upload){
           
                _this.getSettings()  
              }else{
                var pages = getCurrentPages() 
  
                if(pages[0].route == 'pages/home/index/index' || pages[0].route == 'pages/special/index/index'){
          
                  pages[0].onShow();
                  return;
                }
                wx.switchTab({
                  url: '/pages/home/index/index',
                  success: function (e) {  
         
                    var page = getCurrentPages().pop();  
                    if (page == undefined || page == null) return;  
                    page.onLoad();  
                  }
                })
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
                    token : this.globalData.token
                  },
                  method : 'post',
                  success : (res)=>{
                    //可以继续本页面逻辑
                    var pages = getCurrentPages() 
  
                    if(pages[0].route == 'pages/home/index/index' || pages[0].route == 'pages/special/index/index'){
              
                      pages[0].onShow();
                      return;
                    }
                    wx.switchTab({
                      url: '/pages/home/index/index',
                      success: function (e) {  

                        var page = getCurrentPages().pop();  
                        if (page == undefined || page == null) return;  
                        page.onLoad();  
                      }
                    })
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
            // this.getBannerList();
            var pages = getCurrentPages() 

            if(pages[0].route == 'pages/home/index/index' || pages[0].route == 'pages/special/index/index'){
                
              pages[0].onShow();
              return;
            }
            wx.switchTab({
              url: '/pages/home/index/index',
              success: function (e) {  
                
                var page = getCurrentPages().pop();  
                if (page == undefined || page == null) return;  
                page.onLoad();  
              }
            })
          }else{
            wx.redirectTo({
              url: '/pages/home/login/index',
            })
          }
        }

      }
    })
  },
  setShare(shareObj){
    return {
      title: '我的标题就是我',
      path: '/pages/special/index/index',
      imageUrl : ''
    }
  },
  globalData: {
    url: 'https://ylapi.luckywb.com/api',
    // url: 'https://yulin.luckywb.com/api',
    userInfo: null,
    token: '',
    latitude : '',
    longitude : '',
  }
})
