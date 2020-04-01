// miniprogram/pages/home/login/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
          wx.switchTab({
            url: '/pages/home/index/index',
          })
        } 
      })
    }else{
      //未授权不作处理

    }

  }
})