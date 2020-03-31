
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
      {
        notice_title : '最新消息',
        c_time : '2020-12-12'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(finish){
      return;
    }
    let num = this.data.page.page;
    this.setData({
      page : {
        page : num + 1
      }
    })
    // this.loadList();
  },
  fomatDate(val){
  
    return util.formatDate(val)
  },

  loadList(){
    util.ajax({
      url: '/v1/notices/1/2',
      method: 'GET',
      data : {
        page_index : this.data.page.page,
        page_size : this.data.page.pageSize
      },
      success: (res) => {
        this.setData({
          list: res.data.list
        })
        // if (res.data.pageData.macPage == 0 || res.data.pageData.macPage == this.data.page.page){
        //   this.setData({
        //     finish : true
        //   })
        // }
      }
    })
    
  },
  mesDetail(e){
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/my/mesDetail/index?id=' + id,
    })
  }
})