// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
    /**
     * 页面的初始数据
     */
    data: {
        boards: [
            {key: 'reading/index/', title: 'reading'},
            {key: 'movie/list/0', title: 'movie'}
        ],
        loading: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        const promises = this.data.boards.map(board => {
            return app.one.find(board.key)
                .then(res => {
                    if (board.key === 'reading/index/') {
                        let d = res.data.essay.filter((item, index) => {
                            return item.author_list.length > 0
                        }).slice(0, 5)
                        console.log('reading', d)
                        board.data = [];
                        d.forEach((item, index) => {
                            let obj = {
                                id: item.content_id,
                                title: item.hp_title,
                                imgUrl: item.author_list[0].web_url
                            }
                            board.data.push(obj);
                        })
                        return board
                    }
                    if (board.key === 'movie/list/0') {
                        let d = res.data.filter((item, index) => {
                            return item.author_list.length > 0
                        })
                        console.log('movie', d)
                        board.data = [];
                        d.forEach((item, index) => {
                            let obj = {
                                id: item.id,
                                title: item.title,
                                imgUrl: item.author_list[0].web_url
                            }
                            board.data.push(obj);
                        })
                        return board
                    }
                })
        })
        Promise.all(promises).then(boards => this.setData({boards: boards, loading: false}))
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        // TODO: onReady
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
        // TODO: onPullDownRefresh
    }
})
