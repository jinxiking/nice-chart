// miniprogram/pages/active/index/index.js
const util = require('../../../utils/ajax.js');
// let mytag = false;
let timer = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mytag : false,
    shak_show : true,
    imgPath : '',
    recoard : {},
    isExists : true,
    luckCode : '',
    list : [1,2,3,4,5,6,7,8],
    currents : 1,
    scrollCurrent : 0,
    bannerList : [
     
    ],
    indicatorDotss: false,
    verticals: true,
    autoplays: true,
    circular: false,
    interval: 2000,
    duration: 500,
    current: 0,
    pageTag : true,
    page : {
      page : 1,
      pageSize : 20
    },
    messageCont : [

    ]
  },
  onShow:function(){
    this.scroller();
    this.getActives();
    this.getBottom();
    this.setData({
      autoplays : true
    })
  },
  onHide:function(){
    this.setData({
      autoplays : false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },  
  closeShak(){
    this.setData({
      shak_show : true,
    })
  },
  closeBg(){
    if(this.data.recoard.campaign_id == -1){
      this.setData({
        shak_show : true,
      })
    }
  },
  getBottom(){
    util.ajax({
      url: '/v1/messages/'+this.data.page.page+'/' + this.data.page.pageSize,
      method: 'GET',
      data : {
         
      },
      noLoading : true,
      success: (res) => {
        let list = this.data.messageCont
        if(res.data.list.length == 0){
          this.setData({
            pageTag:false
          })
          return;
        }
        this.setData({
          pageTag:true
        })
        for(var i = 0;i<res.data.list.length;i++){
       
            list.push(
              res.data.list[i]
            )
      
        }
        this.setData({
          messageCont :list
        })
      }
    })
  },
  bindchange(r){
    if(r.detail.current == (this.data.messageCont.length - 5)){
      if(this.data.finish){
        return;
      }
      let num = this.data.page.page;
      if(this.data.pageTag){
        this.setData({
          page : {
            page : num + 1,
            pageSize : 20
          }
        })
      }
      
      this.getBottom()
    }
  },
  toMyCoupon(){
    wx.navigateTo({
      url: '/pages/my/coupon/index',
    })
  },
  getActives(){
    util.ajax({
      url: '/v1/campaigns',
      method: 'GET',
      data : {
         
      },
      success: (res) => {
       this.setData({
        list : res.data.list,
        luckCode : res.data.luckCode,
        isExists : res.data.isExists
       })
      }
    })
  },
  scroller(){

  },
  stopTouchMove(){
    return false;
  },
  begin(){

    if(this.data.mytag || this.data.isExists){
      return;
    }
    this.setData({
      mytag : true
    })
    
    //请求中将接口
    util.ajax({
      url: '/v1/start/campaign/' + this.data.luckCode,
      method: 'GET',
      data : {
        
      },
      success: (res) => {
        this.setData({
          scrollCurrent : 1
        })
        if(res.data.campaign_id === 0){
          res.data.campaign_id = -1
        }
        let num = 0;
        for(var i = 0;i<this.data.list.length;i++){
          console.log(this.data.list[i])
          if(this.data.list[i].campaign_id == res.data.campaign_id){
            this.setData({
              recoard : this.data.list[i]
            })
            num = 40 + i + 1;
          }

        }

        this.interval(num);
        
      },
      fali(res){
        this.setData({
          mytag : false
        })
      }
    })
  },
  interval(randomNum){
    console.log(randomNum)
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
                        _this.setData({
                          shak_show : false,
                          isExists : true
                        })
                        
                      }
                      _this.setData({
                        scrollCurrent: num
                      })
                    },300)

                  }
                  _this.setData({
                    scrollCurrent: num
                  })
                }, 270)

              }
              _this.setData({
                scrollCurrent: num
              })
            }, 150)

          }
          _this.setData({
            scrollCurrent: num
          })
        }, 100)
      }
      _this.setData({
        scrollCurrent : num
      })
    },100)
  }
})