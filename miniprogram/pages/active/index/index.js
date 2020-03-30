// miniprogram/pages/active/index/index.js
let timer = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list : [1,2,3,4,5,6,7,8],
    current : 1,
    scrollCurrent : 1,
    bannerList : [
      {
        text : '1'
      }, 
      {
        text: '2'
      },
      {
        text: '3'
      },
      {
        text: '4'
      },
      {
        text: '5'
      },
      {
        text: '6'
      },
      {
        text: '7'
      }
    ],
    indicatorDots: false,
    vertical: true,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    current: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.scroller();
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

  },
  scroller(){

  },
  stopTouchMove(){
    return false;
  },
  begin(){
    let randomNum = 40 + Math.floor(Math.random() * (1 - 8) + 8);
    wx.showToast({
      title: '奖品是' + (randomNum - 40),
      icon: 'success',
      duration: 2000
    })
    this.interval(randomNum);
  },
  interval(randomNum){
    let _this = this;
    let num = 0;
    let sum = 0;
    let cont = 0;
    timer = setInterval(()=>{
      num ++;
      cont ++;
      if(num == 9){
        sum = sum + 9;
        num = 1;
      }
      if (((sum + num)%10 == 1) && sum != 0){
        clearInterval(timer);
        //减速第二层循环
        timer = setInterval(() => {
          num++;
          cont++;
          if (num == 9) {
            sum = sum + 9;
            num = 1;
          }
          if (((sum + num) % 10 == 1) && sum != 0) {
            clearInterval(timer);
            //减速第三层循环
            timer = setInterval(() => {
              num++;
              cont++;
              if (num == 9) {
                sum = sum + 9;
                num = 1;
              }
              if (((sum + num) % 10 == 1) && sum != 0) {
                clearInterval(timer);
                //减速第四层循环
                timer = setInterval(() => {
                  num++;
                  cont++;
                  if (num == 9) {
                    sum = sum + 9;
                    num = 1;
                  }
                  if (((sum + num) % 10 == 1) && sum != 0) {
                    clearInterval(timer);
                    //减速第五层循环
                    timer = setInterval(() => {
                      num++;
                      cont++;
                      if (num == 9) {
                        sum = sum + 9;
                        num = 1;
                      }
                      if (cont == randomNum) {
                        clearInterval(timer);
                        //减速第六层循环
                        

                      }
                      _this.setData({
                        scrollCurrent: num
                      })
                    },800)

                  }
                  _this.setData({
                    scrollCurrent: num
                  })
                }, 400)

              }
              _this.setData({
                scrollCurrent: num
              })
            }, 300)

          }
          _this.setData({
            scrollCurrent: num
          })
        }, 250)
      }
      _this.setData({
        scrollCurrent : num
      })
    },100)
  }
})