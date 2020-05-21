// pages/_home/_home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[{
      id: 1, text: '你到底想伽马', finished: true   
    },{
      id: 2, text: '什么叫特莫的惊奇', finished: false   
    },{
      id: 3, text: '我太难了', finished: false   
    },{
      id: 4, text: '实战番茄闹钟', finished: true   
    },{
      id: 5, text: '打酱油', finished: false   
    },{
      id: 6, text: '嘿嘿', finished: true   
    },],
    visibleConfirm: false
  },
  createConfirm(event){
    console.log(event.detail);
    let content = event.detail
    if(content){
      let todo = [{id:this.data.lists.length, text: content, finished:false}]
      this.data.lists = this.data.lists.concat(todo)
      console.log(this.data.lists);
      
      this.setData({
        lists:this.data.lists
      })
      this.hideConfirm()
    }
  },
  destoryTodo(event){
    let index = event.currentTarget.dataset.index
    this.data.lists[index].finished = true
    this.setData({ lists: this.data.lists})
  },
  hideConfirm(event){
    this.setData({visibleConfirm: false})
  },
  showConfirm(){
    this.setData({
      visibleConfirm: true
    })
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