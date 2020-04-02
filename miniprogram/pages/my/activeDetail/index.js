// miniprogram/pages/my/activeDetail/index.js
const util = require('../../../utils/ajax.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchDateStart : '',
    searchDateEnd : '',
    detailTop : {
      total : 0,
      receive : 0,
      use : 0,
      notUse : 0,
      title : ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    let id = 38;
    this.getDetailTop(id);
  },
  getDetailTop(id){
    util.ajax({
      url: '/v1/campaigninfo/' + id,
      method: 'GET',
      data : {
         
      },
      success: (res) => {
        console.log(res)
        this.setData({
          detailTop : res.data
        })
      }
    })
  },



  bindStartDate(e){
    this.setData({
      searchDateStart : e.detail.value
    })
  },
  bindEndDate(e){
    this.setData({
      searchDateEnd: e.detail.value
    })
  },
})