// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    loading: true
  },

  getCache () {
    return new Promise(resolve => {
      app.wechat.getStorage('last_splash_data')
        .then(res => {
          // 有缓存，判断是否过期
          if (res.data.expires < Date.now()) {
            // 已经过期
            console.log('storage expired')
            return resolve(null)
          }
          return resolve(res.data)
        })
        .catch(e => resolve(null))
    })
  },

  handleStart () {
    // TODO: 访问历史的问题
    wx.switchTab({
      url: '../board/board'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getCache()
      .then(cache => {
        if (cache) {
          return this.setData({ movies: cache.movies, loading: false })
        }

        const ONE_DAY = 1 * 24 * 60 * 60 * 1000;

        app.douban.find('coming_soon', 1, 3)
          .then(d => {
            if(d.subjects){
                this.setData({ movies: d.subjects, loading: false })
                return app.wechat.setStorage('last_splash_data', {
                    movies: d.subjects,
                    expires: Date.now() + ONE_DAY
                })
            }else {
                this.handleStart()//若请求失败,则直接跳转榜单首页
            }
          })
          .then(() => console.log('storage last splash data'))
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
