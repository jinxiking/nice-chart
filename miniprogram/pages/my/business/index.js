// miniprogram/pages/my/business/index.js
const util = require('../../../utils/ajax.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail : {

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail();
  },
  getDetail(){
 
    util.ajax({
      url: '/v1/business',
      method: 'GET',
      data : {
        
      },
      success: (res) => {
        this.setData({
          detail : res.data
        })
        
      }
    })
  },
  saveImg(){
    wx.getImageInfo({
      src : this.data.detail.url,
      success : res=>{
        console.log(res)
          wx.saveImageToPhotosAlbum({
            filePath : res.path,
            success(res) { 
              wx.showToast({
                title: '保存成功',
                icon : 'none'
              })
            },
            fail(res){
              console.log(res)
            }
          })
      }
    })

  }
})