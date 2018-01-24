// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        loading: true,
        movie: {}
    },

    fetchDetail(id) {
        return app.douban.findOne(id)
            .then(d => {
                this.setData({title: d.title, movie: d, loading: false})
                wx.setNavigationBarTitle({title: d.title + ' « 电影 « 豆瓣'})
            })
            .catch(e => {
                this.setData({title: '获取数据异常', movie: {}, loading: false})
                console.error(e)
            })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(params) {
        this.setData({id: params.id})
        this.fetchDetail(params.id)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.setNavigationBarTitle({title: this.data.title + ' « 电影 « 豆瓣'})
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // TODO: onShow
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        // TODO: onHide
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        // TODO: onUnload
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.setData({
            title: '',
            loading: true,
            movie: {}
        })
        this.fetchDetail(this.data.id)
            .then(() => app.wechat.original.stopPullDownRefresh())
    },

    onShareAppMessage() {
        let self = this;
        return {
            title: self.data.title,
            desc: '豆瓣电影,最具人气的电影网站',
            path: '/pages/item/item?id=' + self.data.id,
            success: (res) => {
                console.log('success', res)
            },
            fail: (err) => {
                console.error('fail', err)
            },
            complete: () => {
                console.log('/pages/item/item?id=' + self.data.id)
            }
        }
    }
})
