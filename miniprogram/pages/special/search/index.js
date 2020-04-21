
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: '',
    focus : false
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

    this.search('红苹果')
  },

  search: function (value) {
      console.log(value)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  searchAction(e){
    console.log('select result', e.detail)
  }
  
})