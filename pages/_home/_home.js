const {
  http
} = require('../../lib/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    updateContent: '',
    updateId: '',
    updateIndex: '',
    visibleCreateConfirm: false,
    visibleUpdateConfirm: false
  },
  onShow() {
    http.get('/todos?completed=false').then(response => {
      this.setData({
        lists: response.data.resources
      })
    })
  },
  createConfirm(event) {
    let content = event.detail
    if(content){
      http.post('/todos', {
        completed: false,
        description: content
      }).then(response => {
        let todo = [response.data.resource]
        this.data.lists = this.data.lists.concat(todo)
        this.setData({
          lists: this.data.lists
        })
        this.hideCreateConfirm()
      })
    }
  },
  destoryTodo(event) {
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    http.put(`/todos/${id}`, {
      completed: true
    }).then(response => {
      let todo = response.data.resource
      this.data.lists[index] = todo
      this.setData({
        lists: this.data.lists
      })
    })
  },
  changeText(event) {
    let {
      id,
      index,
      content
    } = event.currentTarget.dataset
    this.updateId = id
    this.updateIndex = index
    this.setData({
      visibleUpdateConfirm: true,
      updateContent: content
    })
  },
  updateTodo(event) {
    let content = event.detail
    http.put(`/todos/${this.updateId}`, {
      description: content,
    }).then(response => {
      let todo = response.data.resource
      this.data.lists[this.updateIndex] = todo
      this.setData({
        lists: this.data.lists
      })
      this.hideUpdateConfirm()
    })
  },
  hideCreateConfirm() {
    this.setData({
      visibleCreateConfirm: false
    })
  },
  showCreateConfirm() {
    this.setData({
      visibleCreateConfirm: true
    })
  },
  hideUpdateConfirm() {
    this.setData({
      visibleUpdateConfirm: false
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

  }
})