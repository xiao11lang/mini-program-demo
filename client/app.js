//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
App({
    onLaunch: function (options) {
      /*wx.checkSession({
        success:function(){
          wx.login({
            success: function (res) {
              if (res.code) {
                wx.request({
                  url: 'https://wx.11lang.cn/api/test',
                  data: {
                    code: res.code
                  },
                  method: 'post',
                  success: function (res) {
                    console.log(res.data)
                    if (res.data.third_Session != '') {
                      wx.setStorage({
                        key: 'third_Session',
                        data: res.data.third_Session,
                      });

                    }
                  }
                })
              }
            }
          })
        },
        fail:function(){
          
        }
      })*/
      var that=this
      wx.showModal({
        title: '授权申请',
        content: '小程序需要获取您的信息，是否允许',
        confirmText: "允许",
        cancelText: "拒绝",
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中请稍候',
              mask:true
            })
            wx.getUserInfo({
              success:function(res){
                var userInfo=res.userInfo
                wx.login({
                  success: function (res) {
                    if (res.code) {
                      wx.request({
                        url: 'https://wx.11lang.cn/api/test',
                        data: {
                          code: res.code,
                          userInfo: userInfo
                        },
                        method: 'post',
                        success: function (res) {
                          wx.hideLoading()
                          console.log(res)
                          if (res.data.third_Session != '') {
                            that.third_Session = res.data.third_Session
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
          } else {
            console.log('用户拒绝')
          }
        }
      })
        
        console.log(options)
    },
    onError:function(){
      console.log('error')
    },
    userInfo:{}
})