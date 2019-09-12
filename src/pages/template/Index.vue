<template lang="pug">
    .container
        app-link(:to="{name:'security',query:{id:'我是模版跳转过来对'}}")
            span app-link組件跳转
        span(@click="toLink") 方法openPage跳转
        span(@click="getRequest") http请求:get请求
        span(@click="postRequest") http请求:post请求
        p {{result}}

</template>

<script>
    import {getVerifyCode} from '../../api'
    import {login} from '../../api/user'
    import {openPage} from "../../utils/jsBrige";
    export default {
        name: 'app',
        data() {
            return {
                result:""
            }
        },
        async created() {
            try {

            } catch ({msg}) {
                this.$toast(msg);
            }
        },
        mounted() {
        },
        methods: {
            async getRequest(){
                // get请求接口案例
                let {data} = await getVerifyCode({modelCode:'1001'});
                this.result=JSON.stringify(data);
                console.log(data);
            },

            async postRequest(){
                let {data} = await login({mobilePhone:'1001',dynamicVerifyCode:'1234',msgId:"123"});
                this.result=JSON.stringify(data);
                console.log(data);
            },

            // 跳转接口案例
            toLink() {
                openPage({name: 'security', query: {id: '我是模版跳转过来对'}})
            }
        },
        components: {}
    }
</script>
<style lang="scss">
    @import "../../assets/css/mixin";
    .container{
        height: 100vh;
        @include flexColum(center,center);
        span{
            max-width: 300px;
            padding-left: 20px;
            padding-right: 20px;
            line-height: 1.5;
            margin-top: 20px;
        }

        p{
            margin-top: 20px;
        }
    }
</style>
