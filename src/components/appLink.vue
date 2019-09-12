<template lang="pug">
    .app-link(@click="go")
        slot
</template>

<script>
    import config from '../config/app.js'

    export default {
        name: 'appLink',
        props: {
            to: {
                type: Object,
                required: true,
            },
            headerSetting: {
                type: Object,
                default: () => {
                    return {
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
                    }
                }
            }
        },
        created(){
        },
        methods: {
            go() {
                //跳转对象路由为空 不跳转
                if (!this.to.name && this.to.name == '') {
                    this.$emit('diy');
                    return;
                }
                this.$emit('clickCallback');
                if (window.rn) {
                    if (this.to.name === 'index') {
                        rn.app.goHome()
                    }else{
                        rn.app.open(this.link, this.headerSetting)
                    }
                } else {
                   window.location.href = this.link
                }
            }
        },
        computed: {
            link() {
                let queryData = []
                this.to.query && Object.keys(this.to.query).map((key) => queryData.push(`${key}=${this.to.query[key]}`))
                let href = `${window.location.origin}/${this.to.name}.html`
                let query = queryData.join('&')
                return query ? `${href}?${query}&date=${config.version}` : `${href}?date=${config.version}`
            }
        }
    }
</script>
<style lang="scss">
</style>
