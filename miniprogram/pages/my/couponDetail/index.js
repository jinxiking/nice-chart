// miniprogram/pages/my/couponDetail/index.js
const util = require('../../../utils/ajax.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList : [
      {
        name : '未消费'
      },
      {
        name : '已消费'
      }
    ],
    shopList : [
    
    ],
    current : 0,
    page : {
      page : 1,
      pageSize : 10
    },
    finish : false,
    id : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let id = options.id
    let id = 3;
    this.setData({
      id : id
    })
    this.getList(id);
  },
  getList(){
    util.ajax({
      url: '/v1/shopcoupons/'+this.data.page.page+'/' + this.data.page.pageSize + '/' + this.data.id + '/' + (parseInt(this.data.current) + 1),
      method: 'GET',
      data : {

      },
      success: (res) => {
        let list = this.data.shopList.concat(res.data.list)
        this.setData({
          shopList: list
        })

        
        if (res.data.total == 0 || res.data.total  == this.data.page.page){
          this.setData({
            finish : true
          })
        }

      }
    })
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
        pageSize : 10
      }
    })
    this.getList();
  },
  getTime(){

  },
  changTab(e){
    this.setData({
      shopList : [],
      finish : false,
      page : {
        page : 1,
        pageSize : 10
      }
    })
    let id = e.currentTarget.id;
    this.setData({
      current: id
    })
    this.getList();
  },
  toHome(){
    wx.switchTab({
      url: '/pages/home/index/index',
    })
  }
})