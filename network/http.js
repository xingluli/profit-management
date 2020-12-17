import {baseUrl} from './config.js'

export default function (options){
  return new Promise((resolve,reject) => {
    wx.request({
      url: baseUrl + options.url,
      method:options.method || 'GET',
      data:options.data || {},
      header: {
        "Content-Type": "application/json; charset=utf-8",
        "Cookie": options.cookie || ''
      },
      success:resolve,
      fail:reject  
    })
  })
}