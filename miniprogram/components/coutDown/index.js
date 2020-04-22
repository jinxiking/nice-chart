
// count-down/count-down.js
Component({
  externalClasses: ['c-class'], // 自定义样式
  /**
   * 组件的属性列表
   */
  properties: {
    target: Number, // 结束时间
    showDay: Boolean, // 是否显示天
    callback: String, // 回调
    format: Array, // 自定义格式
    clearTimer: Boolean // 清除定时器
  },
 
  /**
   * 组件的初始数据
   */
  data: {
    time: ''
  },
 
  ready () {
    this.getFormat();
   
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    init () {
      const self = this;
      setTimeout(function () {
        self.getLastTime.call(self);
      }, 1000);
    },
    getFormat () {
      const data = this.data;
    
      if (data.format.length === 3) data.format.splice(0, 0, '');
     
      this.getLastTime();
    
    },
    getLastTime () {

      const data = this.data;
      const gapTime = Math.ceil((data.target - new Date().getTime()) / 1000);// 距离结束还有多少秒
      let time = '00:00:00';
      let day = '00';
      const format = data.format;
      if (gapTime > 0) {
        day = this.formatNum(parseInt(gapTime / 86400)); // 天
        let lastTime = gapTime % 86400;
        const hour = this.formatNum(parseInt(lastTime / 3600)); // 时
        lastTime = lastTime % 3600;
        const minute = this.formatNum(parseInt(lastTime / 60)); // 分
        const second = this.formatNum(lastTime % 60); // 秒
        if (data.format.length > 0) {// 自定义格式处理
          time = `${data.showDay?`${day}${format[0]}`:''}${hour}${format[1]}${minute}${format[2]}${second}${format[3]}`;
        } else {
          time = `${data.showDay?`${day}:`:''}${hour}:${minute}:${second}`
        }

        if (!data.clearTimer) this.init.call(this);
      } else {
        this.endfn();
      }
      this.setData({
        time: time
      });
    },
    formatNum (num) {// 格式化
      return num > 9 ? num : `0${num}`;
    },
    endfn () {
      this.triggerEvent('callback', {});
    }
  }
})
