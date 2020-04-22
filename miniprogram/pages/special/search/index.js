const util = require('../../../utils/ajax.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    clearTimer : false,
    inputVal: '',
    focus : false,
    searchTag : false,
    bottomList : [],
    page : {
      page : 1,
      pageSize : 20
    },
    finish : false,
  },  
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
    this.getBottomList();
  },
  getBottomList(){
    if(!this.data.inputVal){
      return;
    }
    util.ajax({
      url: '/v1/ybh/list/0/' + this.data.page.page + '/' + this.data.page.pageSize + '?search=' + this.data.inputVal,
      method: 'GET',
      data : {

        
      },
      success: (res) => {
        let time = new Date().getTime();
        if(!res.data.list){
          return;
        }
        for(var i = 0;i<res.data.list.length;i++){
   
          res.data.list[i].targetTime = time + res.data.list[i].down_time*1000

        }
        
        let list = this.data.bottomList.concat(res.data.list);
        
        this.setData({
          bottomList : list
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
        search: this.search.bind(this)
    })
  },
  search_hot(){
    this.setData({
      inputVal : '红苹果',
      
    })
      
    var header = this.selectComponent('#header')
    // 父组件里执行子组件的方法
    header.changeSearchStete()

    this.search('红苹果');
  },

  search: function (value) {
    this.setData({
      inputVal : value,
      searchTag : true,
      page : {
        page : 1,
        pageSize : 20
      },
      finish : false,
      bottomList : []
    })
    if(!value){
      this.setData({
        searchTag : false,
        bottomList : []
      })
      return;
    }

    this.getBottomList(value);

  },

  searchAction(e){
    console.log('select result', e.detail)
  },
  topDetai(e){
    wx.navigateTo({
      url: '/pages/home/detail/index?cloudId=' + e.currentTarget.dataset.vid,
    })
  },
  
})