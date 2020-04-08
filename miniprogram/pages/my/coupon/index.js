// miniprogram/pages/my/coupon/index.js
const util = require('../../../utils/ajax.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page : {
      page : 1,
      pageSize : 20
    },
    finish : false,
    list : [
  
    ]
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.finish){
      return;
    }
    let num = this.data.page.page;
    this.setData({
      page : {
        page : num + 1,
        pageSize : 20
      }
    })
    this.getCouponList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponList();
  },
  getCouponList(){
    util.ajax({
      url: '/v1/shoplist/'+this.data.page.page+'/' + this.data.page.pageSize,
      method: 'GET',
      data : {

      },
      success: (res) => {
        
        let list = this.data.list.concat(res.data.list)
        this.setData({
          list: list
        })

        
        if (res.data.total == 0 || res.data.total  == this.data.page.page){
          this.setData({
            finish : true
          })
        }

      }
    })
  },
  toAdress(e){
  
    wx.openLocation({
      latitude: e.currentTarget.dataset.latitude,//要去的纬度-地址
      longitude: e.currentTarget.dataset.longitude,//要去的经度-地址
    })
  
  },
  toDetail(e){
   
    wx.navigateTo({
      url: '/pages/my/couponDetail/index?id=' + e.currentTarget.dataset.vid,
    })
  }
})