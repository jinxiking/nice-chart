// miniprogram/pages/my/question/index.js
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
        wx.uploadFile({
          url: app.globalData.ajax_url + 'common/uploadImg', // 自己的服务器提供的图片的小程序choose接口地址
          filePath: tempFiles,
          name: 'file',
          formData: {
             userId: wx.getStorageSync('userId')
          },
          success(res) {

          }
        }) 
      }
    })
  }




})