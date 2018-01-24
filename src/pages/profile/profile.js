// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'AboutMe',
    userInfo: {
      wechat: 'WEDN-NET',
      nickName: '李枝琴(lizhiqin)',
      avatarUrl: '../../images/qrcode.png',
      country: '',
      province: '',
      city: ''
    }
  },

  getUserInfo () {
    const that = this
    app.wechat.getUserInfo('zh_CN')
      .then(res => that.setData({ userInfo: res.userInfo }))
      .catch(err => console.error('getUserInfo fail', err))
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    app.wechat.login()
      .then(res => {
        if (res.code) {
          console.log('登录成功！' + res.code)
        } else {
          console.error('获取用户登录态失败！' + res.errMsg)
        }
      })
  }
})
