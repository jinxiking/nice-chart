// pages/home/mesDetail/index.js

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
    // this.getMes(options.id);
  },
  getMes(id){
    util.ajax({
      url: '/v1/notice/get-notice',
      method: 'GET',
      data: {
        notice_id: id,
      },
      success: (res) => {
        this.setData({
          detail: res.data
        })
      }
    })
  }
})