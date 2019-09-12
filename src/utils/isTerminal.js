const ua = window.navigator.userAgent.toLowerCase()

const isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(ua)
const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua)
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua)
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
const isWechat = /micromessenger/i.test(ua)
const isAlipay = /alipayclient/i.test(ua)

const isIpx = /iphone/gi.test(navigator.userAgent) && ((screen.height === 896 && screen.width  === 414) || (screen.height === 812 && screen.width === 375))


export {
  isIphone,
  isWechat,
  isAlipay,
  isAndroid,
  isIpad,
  isIpod,
  isIpx
}
