
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadList();
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
    this.loadList();
  },

  loadList(){
    util.ajax({
      url: '/v1/notices/'+this.data.page.page+'/' + this.data.page.pageSize,
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
  mesDetail(e){
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/my/mesDetail/index?id=' + id,
    })
  }
})