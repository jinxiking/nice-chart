//app.js
App({
  onLaunch: function () {
    
    this.getSettings();
    this.getLocationNow();


    var token = wx.getStorageSync('token') || '';
    // 登录
    if (token) {
      this.globalData.token = token;
      
      wx.redirectTo({
        url: '/pages/home/index/index',
      })
    } else {
      this.doLogin();
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
    wx.login({
      success: res => {
        console.log(res)
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
            let token = res.data.data.token;
         
            wx.setStorageSync('token', token);
            _this.globalData.token = token;
            if(!res.data.data.is_upload){
              _this.getSettings()  
            }
          } 
        })
      }
    })
  },
  getSettings(){
    wx.getSetting({
      success : (res)=>{
        console.log(res)
      }
    })
  },
  globalData: {
    url: 'https://yulin.luckywb.com/api',
    userInfo: null,
    token: '',
    latitude : '39.90469',
    longitude : '116.40717',
  }
})
