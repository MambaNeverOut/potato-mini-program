// pages/tomato/tomato.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultSecond: 5,
    time: '',
    timer: null,
    timerStatus: 'start',
    confirmVisible: false,
    againButtonVisible: false,
    finishConfirmVisible: false
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.startTimer()
  },
  againTimer() {
    this.data.defaultSecond = 5
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
      if (this.data.defaultSecond <= 0) {
        this.setData({
          againButtonVisible: true
        })
        this.setData({
          finishConfirmVisible: true
        })
        return this.clearTimer()
      }
      this.data.defaultSecond = this.data.defaultSecond - 1
      this.changeTime()
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
    wx.navigateBack(-1)
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

  }
})