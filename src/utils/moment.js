const moment = {
  getTime (time) {
    return `${this.getYear(time)}-${this.getMonth(time)}-${this.getDay(time)} ${this.getHours(time)}:${this.getMinutes(time)}:${this.getSeconds(time)}`
  },
  getDate (time) {
    return `${this.getYear(time)}-${this.getMonth(time)}-${this.getDay(time)}`
  },
  getYear (time) {
    time = time || new Date().getTime()
    let year = new Date(time).getFullYear()
    return year
  },
  getMonth (time) {
    time = time || new Date().getTime()
    let month = new Date(time).getMonth() + 1
    return month < 10 ? '0' + month : month
  },
  getDay (time) {
    time = time || new Date().getTime()
    const day = new Date(time).getDate()
    return day < 10 ? '0' + day : day
  },
  getHours(time) {
    time = time || new Date().getTime()
    const hours = new Date(time).getHours();
    return hours < 10 ? '0' + hours : hours
    return hours
  },
  getMinutes(time) {
    time = time || new Date().getTime()
    const minutes = new Date(time).getMinutes();
    return minutes < 10 ? '0' + minutes : minutes
    return minutes
  },
  getSeconds(time) {
    time = time || new Date().getTime()
    const seconds = new Date(time).getSeconds();
    return seconds < 10 ? '0' + seconds : seconds
    return seconds
  },
}

export default moment