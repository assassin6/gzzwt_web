<template lang="pug">
    .image
        .image-content(:style="{'background-image': `url(${src})`}")
        .image-wrapper
            img.image-placeholder(:src="placeholder" :style="{'width': placeholderWidth}")
</template>
<script>
    export default {
        name: 'placeholderImage',
        props: {
            src: {
                type: String,
                required: true
            },
            placeholder: {
                type: String,
                default: require('../assets/images/placeholder.png'),
            },
            placeholderWidth: String,
        }
    }
</script>
<style lang="scss" scoped>
    .image {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #F5F1EB;
        position: relative;
        overflow: hidden;
    }

    .image-content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #fff;
    }

    .image-placeholder {
        width: 100%;
        height: auto;
    }
</style>
