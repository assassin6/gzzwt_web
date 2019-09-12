import Config from '../config/app.js'

const pxtorem = (px) => {
  const scale = document.documentElement.clientWidth / Config.designSize
  const htmlSize = Config.baseSize * Math.min(scale, 2)
  return parseInt(px) / htmlSize + 'rem'
}

const imgPrefix = (url, suffix = '') => {
    if (!url) return ''
    return Config.imagePrefix + url + suffix
}


const fileSize = (limit) => {
  if (limit < 0.1 * 1024) limit = limit.toFixed(2) + 'B'
  else if (limit < 0.1 * 1024 * 1024) limit = (limit / 1024).toFixed(2) + 'KB'
  else if (limit < 0.1 * 1024 * 1024 * 1024) limit = (limit / (1024 * 1024)).toFixed(2) + 'MB'
  else limit = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  let index = (limit + '').indexOf('.')
  let dou = (limit + '').substr(index + 1, 2)
  if (dou == '00') return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  return limit
}

export {
  pxtorem,
  imgPrefix,
  fileSize
}