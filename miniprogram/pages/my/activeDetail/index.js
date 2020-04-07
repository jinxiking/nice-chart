// miniprogram/pages/my/activeDetail/index.js
const util = require('../../../utils/ajax.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchDateStart : '',
    searchDateEnd : '',
    detailTop : {
      total : 0,
      receive : 0,
      use : 0,
      notUse : 0,
      title : ''
    },
    shopListRealArr : ['全部','未消费','已消费'],
    shopIndex : 0,
    page : {
      page : 1,
      pageSize : 20
    },
    finish : false,
    list : [],
    id : ''
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
    this.getList();
  },
  bindpikerChange(e){
    this.setData({
      shopIndex: e.detail.value
    })
    this.reloadList();
  },
  reloadList(){
    this.setData({
      page : {
        page :  1,
        pageSize : 20
      },
      list : []
    })
    this.getList();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    let id = options.id;
    this.setData({
      id : id
    })
    this.getDetailTop(id);
  
    //设置默认值时间以及筛选框
    this.setSettings();
  },
  setSettings(){
    this.setData({
      searchDateStart : this.formatDate(),
      searchDateEnd : this.formatDate(),
    })
    this.getList();
    
  },
  getList(){
    util.ajax({
      url: '/v1/campaignreport/' + this.data.page.page + '/' + this.data.page.pageSize + '/' + this.data.id + '/'+ this.data.shopIndex + '/' + this.data.searchDateStart + '/' + this.data.searchDateEnd,
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
  formatDate(date, str = "YY-MM-DD") {
    var newDate = new Date();
    str = str.replace("YY", newDate.getFullYear());
    str = str.replace("MM", this.add0(newDate.getMonth() + 1));
    str = str.replace("DD", this.add0(newDate.getDate()));
    str = str.replace("hh", this.add0(newDate.getHours()));
    str = str.replace("mm", this.add0(newDate.getMinutes()));
    str = str.replace("ss", this.add0(newDate.getSeconds()));
    return str
  },
  add0(str){
    str = str + '';
    if (str.length >= 2) {
      return str
    } else {
      return '0' + str
    }
  },
  getDetailTop(id){
    util.ajax({
      url: '/v1/campaigninfo/' + id,
      method: 'GET',
      data : {
         
      },
      success: (res) => {
        console.log(res)
        this.setData({
          detailTop : res.data
        })
      }
    })
  },
  bindStartDate(e){
    this.setData({
      searchDateStart : e.detail.value
    })
    this.reloadList();
  },
  bindEndDate(e){
    this.setData({
      searchDateEnd: e.detail.value
    })
    this.reloadList();
  },
})