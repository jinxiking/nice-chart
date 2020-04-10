// miniprogram/pages/home/advertising/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath : '',
    index : 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.url + '/v1/banner/1',
      data: {},
      method: 'get',
      header: {},
      success : (res)=>{
      
        if(res.data.data.length != 0){
          this.setData({
            imgPath : res.data.data[0].src
          })
        }

        let timer = setInterval(()=>{
          let num = this.data.index - 1;
          if(num == -1){
            clearInterval(timer);
            wx.switchTab({
              url: '/pages/home/index/index',
            })
          }
          this.setData({
            index : num
          })
         
        },1000)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  
})