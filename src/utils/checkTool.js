/**
 * Dec 描述  验证工具类
 * Created by Curreter on 2019/9/07
 */

const checkUtils = {
    /**
     *   验证字符串是否包含非法字符串
     *   @param <String> checkString   验证的字符串
     *   @return <Boolean>    如果包含就返回T，反之返回F
     */
    isIllegalCharacter: function (checkString) {
        if(this.isString(checkString)) {
            const reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
            if (reg.test(checkString)) {
                return true;
            }
        }
        return false;
    },

    /**
     * 验证字符串是否全部都是数字
     * @param <String> checkString   验证的字符串
     * @return Boolean    如果是就返回T，反之返回F
     */
    isNumber:function (checkString) {
        if(this.isString(checkString)){
            const reg = new RegExp("^\\d+$");
            if (reg.test(checkString)){
                return true;
            }
        }
        return false;
    },

    /**
     *  判断是否是字符串对象
     * @param obj   验证对象
     */
    isString: function (obj) {
        if (typeof(obj) === 'string'){
            return true
        }
        return false;
    }
};

export default checkUtils;