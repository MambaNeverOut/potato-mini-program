const {
  http
} = require("../../lib/http")

Page({
  data: {
    tab: 'tomato',
    tomatoes: {},
    todos: {},
    my: {}
  },
  onShow: function () {
    this.fetchTodos()
    this.fetchTomatoes()
    this.setData({ my: wx.getStorageSync('my')})
  },
  fetchTomatoes() {
    http.get('/tomatoes', {
      is_group: "yes"
    }).then(response => {
      this.setData({
        tomatoes: response.data.resources
      })
    })
  },
  fetchTodos() {
    http.get('/todos', {
      is_group: "yes"
    }).then(response => {
      this.setData({
        todos: response.data.resources
      })
    })
  },
  changeTab(event) {
    let name = event.currentTarget.dataset.name
    this.setData({
      tab: name
    })
  }
})