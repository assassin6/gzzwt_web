import config from '../config/app.js'


const openPage =(to,headerSetting={
    // 状态栏
    statusBar: {
        backgroundColor: '#ffffff',
        barStyle: 'dark-content'   //enum('default'（默认）, 'light-content'（白）, 'dark-content'（黑）)
    },
    // 头部导航
    navigation: {
        headerStyle: { //头部的样式
            backgroundColor: '#ffffff' //头部的样式
        },
        headerTintColor: "#333", // 头部图片覆盖颜色样式

        headerTitleStyle: {color: '#333'} //标题样式
        //header: null // 设置头部隐藏
    }
})=>{
    let queryData = []
    to.query && Object.keys(to.query).map((key) => queryData.push(`${key}=${to.query[key]}`))
    let href = `${window.location.origin}/${to.name}.html`
    let query = queryData.join('&')
     let link= query ? `${href}?${query}&date=${config.version}` : `${href}?date=${config.version}`
    if(window.rn){
        rn.app.open(link, headerSetting)
    }else {
        window.location.href = link
    }

}


const goHome =()=>{
    if(window.rn){
        rn.app.goHome()
    }else {
        let domain = location.origin || 'config.domain'
        window.location.href =`${domain}/index.html?date=${config.version}`
    }
}

const refresh =(data)=>{
    if(window.rn){
        rn.app.refresh(data)
    }else {
    }
}

const selectedPhotos=(config={
    imageCount: 1,
},callBack)=>{
    if(window.rn){
        rn.app.selectedPhotos( config , ({photo})=>{
            callBack(photo)
        })
    }else {
        console.log("选择照片")
    }
}

const upload=async (uploadInfo,callback)=> {
    if (window.rn) {
        rn.app.upload(config.uploadUrl, {
            uri: uploadInfo.uri,
            name: uploadInfo.name,
            token:uploadInfo.token
        }, {key: uploadInfo.key}, ({data}) => {
            callback( uploadInfo.host+data.url)
        })
    }
}

const goTab=(tabName)=>{
    if(window.rn){
        rn.app.goTab(tabName);
    }else {
        let domain = location.origin || config.domain
        window.location.href =`${domain}/professional.html?date=${config.version}`
    }
}

export {
    openPage,
    goHome,
    refresh,
    selectedPhotos,
    upload,
    goTab
}