const { http } = require("../../lib/http")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultSecond: 1500,
    time: '',
    timer: null,
    timerStatus: 'start',
    confirmVisible: false,
    againButtonVisible: false,
    finishConfirmVisible: false,
    tomato: {}
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.startTimer()
    http.post('/tomatoes').then(response => {
      this.setData({ tomato: response.data.resource})
    })
  },
  againTimer() {
    this.data.defaultSecond = 1500
    this.setData({
      againButtonVisible: false
    })
    this.startTimer()
  },
  startTimer() {
    this.setData({
      timerStatus: 'stop'
    })
    this.changeTime()
    this.timer = setInterval(() => {
      this.data.defaultSecond = this.data.defaultSecond - 1
      this.changeTime()
      if (this.data.defaultSecond <= 0) {
        this.setData({
          againButtonVisible: true
        })
        this.setData({
          finishConfirmVisible: true
        })
        return this.clearTimer()
      }
    }, 1000)
  },
  clearTimer() {
    clearInterval(this.timer)
    this.timer = null
    this.setData({
      timerStatus: 'start'
    })
  },
  changeTime() {
    let m = Math.floor(this.data.defaultSecond / 60)
    let s = Math.floor(this.data.defaultSecond % 60)
    if (s === 0) {
      s = '00'
    }
    if ((s + "").length === 1) {
      s = '0' + s
    }
    if ((m + "").length === 1) {
      m = '0' + m
    }
    this.setData({
      time: `${m}:${s}`
    })
  },
  confirmAbandon(event) {
    let content = event.detail
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: content, aborted: true
    }).then( response => {
      // wx.switchTab({
      //   url: 'pages/_home/_home',
      // })
      wx.navigateBack({to:-1})
    })
  },
  showConfirm() {
    this.clearTimer()
    this.setData({
      confirmVisible: true
    })
  },
  hideConfirm() {
    this.startTimer()
    this.setData({
      confirmVisible: false
    })
  },
  confirmFinish(event) {
    let content = event.detail
    http.put(`/tomatoes/${this.data.tomato.id}`,{
      description: content,
      aborted: false
    }).then( response => {
      this.setData({
        finishConfirmVisible: false,
      })
      wx.navigateBack({to:-1})
    })
  },
  confirmCancel() {
    this.setData({
      finishConfirmVisible: false
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: "退出放弃", aborted: true
    }).then( response => {
      wx.navigateBack({to: -1})
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: "退出放弃", aborted: true
    }).then( response => {
      wx.navigateBack({to: -1})
    })
  }
})