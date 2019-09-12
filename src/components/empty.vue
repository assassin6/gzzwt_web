<template lang="pug">
    .empty-wrapper
            img.img(:src="src")
            span.placeholder {{placeholder}}
    
</template>

<script>
    export default {
        name: "empty",
        props: {
            src: {
                type: String,
                default: require('../assets/images/avatar.png'),
            },
            placeholder: {
                type: String,
                default: "暂无内容",
            },
            placeholderWidth: String,
        },
        data(){
            return{

            }

        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/mixin";
    .empty-wrapper{
        @include flexColum(center,center);

        .img{
            @include wh(49,49);
        }
        .placeholder{
            @include font(15,#666,400);
            margin-top: 22px;
        }
    }

</style>