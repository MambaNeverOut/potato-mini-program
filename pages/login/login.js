const {
  http
} = require("../../lib/http.js")
const {
  app_id,
  app_secret
} = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

    // http.get('/todos')
  },
  login(event) {
    let encrypted_data = event.detail.encryptedData
    let iv = event.detail.iv
    this.wxLogin(iv, encrypted_data)
  },
  wxLogin(iv, encrypted_data) {
    wx.login({
      success: (res) => this.loginMy(res.code, iv, encrypted_data)
    })
  },
  loginMy(code, iv, encrypted_data) {
    http.post('/sign_in/mini_program_user', {
      code,
      iv,
      encrypted_data,
      app_id,
      app_secret
    }).then(response => {
      console.log(response);
      wx.setStorageSync('my', response.data.resource)
      wx.setStorageSync('X-token', response.header["X-token"])
      wx.reLaunch({
        url: '/pages/_home/_home',
      })
    })
  }
})