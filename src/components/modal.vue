<template lang="pug">
    van-popup.modal-wrapper(v-model="show" :position="position" :class="{'center':position == 'center'}")
        .top
            span {{title}}
            img(src="../assets/images/delete.png" @click="show = !show")
        slot
</template>

<script>
    import {Popup} from 'vant';
	
	export default {
		name: 'modal',
		props: {
			title: {
		      type: String,
		      default:' ',
		    },
		    position:{
		      type: String,
		      default:'center',
		    }
		},
		data(){
            return{
                show:false,
            }
        },
		methods: {
		},
		components: {
            'van-popup': Popup,
		}
	}
</script>
<style lang="scss">
    @import "../assets/css/mixin";
    
    .center{
		width: 294px;
		border-radius: 5px;
    }
    
	.modal-wrapper{
		display: flex;
		flex-direction: column;
		padding: 20px 19px 36px 19px;
		background: #FFFFFF;
		box-shadow: 0px 0px 2px 1px rgba(0,0,0,.12);
		.top{
	        @include flexRow(center,center);
			position: relative;
			height:18px;
			span{
    			@include font(18,$defalutColor,bold);
			}
			img{
    			@include wh(15,15);
				position: absolute;
				right: 3.5px;
			}
		}
	}
</style>