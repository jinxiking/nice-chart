//app.js
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
            if(res.data.code == 200){
              let token = res.data.data.token;
         
              wx.setStorageSync('token', token);
              _this.globalData.token = token;
              if(res.data.data.is_upload){
                _this.getSettings()  
              }else{
                wx.switchTab({
                  url: '/pages/home/index/index',
                })
              }
            }else{
              
            }
           
          } 
        })
      }
    })
  },
  getSettings(){
    wx.getSetting({
      success : (res)=>{

        //如果已经授权用户信息直接获取
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success : ress=>{
              console.log(ress)
              //服务端存储用户信息
              
              wx.request({
                url: this.globalData.url + '/v1/user/userInfoAdd',
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
                  
                } 
              })
            }
          })
        }
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
