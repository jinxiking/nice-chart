// miniprogram/pages/my/couponDetail/index.js
const util = require('../../../utils/ajax.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chose_node : '',
    detailShowTag : true,
    shak_show : true,
    imgPath : '',
    imgTitle : '',
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
  closeShak(){
    this.setData({
      shak_show : true,
      detailShowTag : true
    })
  },
  userAction(e){
 
    
    var item = this.data.shopList[e.currentTarget.dataset.vindex];
    if(item.end_int == 1){
      return
    }else{
     
      this.setData({
        shak_show : false,
        imgTitle : item.title,
        imgPath : item.name
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    // let id = 2;
    this.setData({
      id : id
    })
    this.getList(id);
  },
  detailShow(e){
    
    let num = e.currentTarget.dataset.vindex;
  
    this.setData({
      detailShowTag : false,
      chose_node : this.data.shopList[num].remark
    })
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