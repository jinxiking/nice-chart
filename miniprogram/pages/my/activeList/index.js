// miniprogram/pages/my/activeList/index.js
const util = require('../../../utils/ajax.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeList : [],
    page : {
      page : 1,
      pageSize : 10
    },
    finish : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getActiveList();
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
  
    if(this.finish){
      return;
    }
    let num = this.data.page.page;
    this.setData({
      page : {
        page : num + 1
      }
    })
    this.loadList();
  },


  toDetail(){
    wx.navigateTo({
      url: '/pages/my/activeDetail/index',
    })
  },
  getActiveList(){
    util.ajax({
      url: '/v1/campaign/'+this.data.page.page+'/' + this.data.page.pageSize,
      method: 'GET',
      data : {
        
      },
      success: (res) => {
        console.log(res)
        this.setData({
          activeList: res.data.list
        })
      }
    })
  }
})