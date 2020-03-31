// miniprogram/pages/home/index/index.js

const util = require('../../../utils/ajax.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    vertical: true,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    current : 0,
    bannerList : [
      {
        top_images : '/images/home/top.png'
      },
      {
        top_images : '/images/home/top.png'
      },
      {
        top_images : '/images/home/top.png'
      },
      {
        top_images : '/images/home/top.png'
      },
      {
        top_images : '/images/home/top.png'
      },
      {
        top_images : '/images/home/top.png'
      }
    ],
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
    this.getBannerList();
  },
  //自定义事件
  topDetai(){
    wx.navigateTo({
      url: '/pages/home/detail/index',
    })
  },
  bindchange(index){
    this.setData({
      current: index.detail.current
    })
  },
  getBannerList(){
    util.ajax({
      url: '/v1/banner/2',
      method: 'GET',
      data : {
        type : '2',
        
      },
      success: (res) => {
        this.setData({
          bannerList: res.data
        })
      }
    })
  }
})