// pages/home/mesDetail/index.js
const util = require('../../../utils/ajax.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail : {
      notice_info : '323123123123'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMes(options.id);
    console.log(options)
  },
  getMes(id){

    util.ajax({
      url: '/v1/notice/' + id,
      method: 'GET',
      data: {
    
      },
      success: (res) => {
        this.setData({
          detail: res.data
        })
      }
    })
  }
})