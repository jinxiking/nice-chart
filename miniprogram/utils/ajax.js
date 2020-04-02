const app = getApp();
const ajax = (option) =>{
  var token = app.globalData.token;

  wx.showLoading({
    title: '加载中',
  })
  console.log(app.globalData)
  let header = {
    token: token,
    lat : app.globalData.latitude,
    lng : app.globalData.longitude,
  }
  if (option.method == 'POST'){
    header = {
      token: token,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
  wx.request({
    url: app.globalData.url + option.url,
    data: option.data,
    method: option.method,
    header: header,
    success : (res)=>{
      if (res.data.code == 200){
        
        option.success(res.data);
      } else if (res.data.code == 1001){
        //重新登录流程
        app.doLogin(ajax,option);
      }else{
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    },
    complete:(res)=>{
      wx.hideLoading();
    },
    fail : ()=>{
    
    }

  })
}


module.exports = {
  ajax: ajax,
}
