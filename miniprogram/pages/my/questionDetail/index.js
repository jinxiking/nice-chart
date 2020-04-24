// miniprogram/pages/my/questionDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current : 0,
    mesList : [
      {
        title : '提示该商品已经秒杀',
        content : '秒杀商品每个账号在一次活动期间只可以秒杀一次',
        active : false,
      },
      {
        title : '转盘实物商品',
        content : '平台暂时未提供在线发货等功能，可以联系在线客服协商相关发货事宜',
        active : false,
      },
      {
        title : '转盘虚拟商品',
        content : '领取后进入我的优惠券，选择商品对应的店铺后可看到优惠券',
        active : false,
      },
      {
        title : '券的使用方法',
        content : '进入我的优惠券，点击进入店铺信息， 找到需要消费的优惠券，点击立即使用，商家扫码确定后该券则被消费。',
        active : false,
      },
      {
        title : '券的使用限制',
        content : '券不可以叠加使用、不可以和线下活动共享、如发现线下活动比券的优惠大、可以联系在线客服或者提交意见反馈告知我们，我们将与商家协商后给到您最大的优惠力度。',
        active : false,
      },
    ]
  },
  setInde(e){
    let list = this.data.mesList;
    list[e.currentTarget.dataset.vindex].active = !list[e.currentTarget.dataset.vindex].active;
    this.setData({
      mesList : list
    })
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

  }
})