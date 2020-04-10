// miniprogram/pages/my/question/index.js
const util = require('../../../utils/ajax.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type : 1,
    message : "",
    tel : '',
    imgList : [],
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
  delImg(e){
    let list = this.data.imgList;
    list.splice(e.currentTarget.dataset.vindex,1);
    console.log(list)
    this.setData({
      imgList : list
    })
  },
  uploadImg(e){
    let _this = this;

    if(this.data.imgList[e.currentTarget.dataset.vindex]){
      return;
    }
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
            const data = JSON.parse(res.data);
      
            let list = _this.data.imgList;
            list[list.length] = data.data
            console.log(list)
            _this.setData({
              imgList : list
            })

          }
        }) 
      }
    })
  },
  submit(){
    //参数验证

    if(!this.data.message){
      wx.showToast({
        title: '请输入意见描述',
        icon : 'none'
      });
      return;
    }

    let arr = [];
    for(var i=0;i<=this.data.imgList.length;i++){
      if(this.data.imgList[i]){
        arr.push(this.data.imgList[i].path);
      }
      
    }

    util.ajax({
      url: '/v1/proposa/add',
      method: 'POST',
      data : {
        remark : this.data.message,
        mobile : this.data.tel,
        type : this.data.type,
        images : arr.join(',')
      },
      success: (res) => {
        wx.showToast({
          title: '感谢您的热心反馈~~',
          icon:'none'
        })
        setTimeout(()=>{
          wx.navigateBack({
            complete: (res) => {},
          })
        },1500)
  
      }
    })
  }




})