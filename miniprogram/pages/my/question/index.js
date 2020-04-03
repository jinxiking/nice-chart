// miniprogram/pages/my/question/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type : 1,
    message : "",
    tel : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeType(e){
    let num = e.currentTarget.dataset['index'];

    this.setData({
      type : num
    })
  },
  bindinputArea(value){
    if(value.detail.value.length > 99){
      let str = value.detail.value.substring(99,0);
      this.setData({
        message : str
      })
      return;
    }
    this.setData({
      message : value.detail.value
    })
  },
  telInput(value){
    this.setData({
      tel : value.detail.value
    })
  },
  uploadImg(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFiles = res.tempFiles[0].path;
        wx.uploadFile({
          url: app.globalData.url + '/v1/image/upload', // 自己的服务器提供的图片的小程序choose接口地址
          filePath: tempFiles,
          name: 'imgFile',
          header : {
            token : app.globalData.token
          },
          formData: {
            
          },
          success(res) {

          }
        }) 
      }
    })
  }




})