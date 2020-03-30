//app.js
App({
  onLaunch: function () {
    wx.login({//调用获取用户openId
      success:function(code){
        console.log(code)
      }
    })
    this.globalData = {}
  }
})
