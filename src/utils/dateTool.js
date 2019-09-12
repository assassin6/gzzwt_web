/**
 * Dec 描述  日期工具类
 * Created by zhanggx on 2019/8/14
 *
 */

const dateUtils = {
    /**
     *  获取两个时间的相距多久，并返回对应的时间类型（秒，分钟，小时）
     * @param date1
     * @param date2
     * @returns {string}
     */
    timeInterval: function(date1, date2) {
        const betweenSeconds = this.getBtweenSeconds(date1, date2, false);
        if (betweenSeconds < 60)
            return "刚刚";
        else if (betweenSeconds > 60 && betweenSeconds < 3600) {
            return parseInt(betweenSeconds /60)+"分钟";
        }
        else{
            return parseInt(betweenSeconds / 3600) +"小时";
        }
    },


    /**
      *  获取两个时间相距多少分钟，如果字符串不合法将返回-1。
      *  @param afterDate:   {Date}    早点的日期
      *  @param beforeDate:  {Date}   晚点的日期
     *   @param isInit       {boolean}  日期是否要重置到当天零时
      *  @returnnumber{int}                  返回相距的分钟数
      */
    getBtweenSeconds: function(afterDate, beforeDate, isInit) {
        if(!this.isDateObject(afterDate) && !this.isDateObject(beforeDate)){
            if(isInit){
                afterDate = this.initZeroDate(afterDate);
                beforeDate = this.initZeroDate(beforeDate);
            }
            let afterTime = afterDate.getTime();
            let beforeTime = beforeDate.getTime();
            const cutTime = Math.abs((beforeTime - afterTime)/1000);
            if (!isNaN(cutTime))
                return parseInt(cutTime);
        }
        return -1;
},

    /**
     *  将字符串日期转换为Date对象，如果字符串不合法将返回null
     * @param {String} strDate  字符串日期
     * @return  {Date}  日期Date实例
     */
    parseDateObject: function (strDate) {
        const date = new Date(strDate);
        if (!this.isDateObject(date)){
            return date;
        }
            return null;
    },

    /**
     * 将Date对象转换为指定格式的字符串, 如果解析正常返回对应字符串日期，反之返回null
     * @param {Date} date  日期对象
     * @param {String} format    转换格式
     * @param {boolean} isHasChines   是否是中文类型
     * @return  {String}  指定格式的日期字符串
     */
    parseStringDate: function(date, format, isHasChines){
        if(this.isDateObject(date) || !this.checkFormat(format))
            return null;
        let strDate ="";           //日期字符串
        /*获取年月日*/
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        if (isHasChines){
            strDate += (year+"年"+month+"月"+day+"日");
        }else{
            strDate += (year+"-"+month+"-"+day);
        }


        let length = format.split(" ").length;
        if (length === 2){
            /*获取时分秒*/
            const hour = date.getHours();
            const minute = date.getMinutes();
            const seconds = date.getSeconds();
            if (isHasChines){
                strDate += (" "+hour+"时"+minute+"分"+seconds+"秒");
            }else{
                strDate += (" "+hour+":"+minute+":"+seconds);
            }

        }
        return strDate;
    },


    /**
     *  判断一个Date对象是否是Invalid Date
     * @param {Date} date    Date对象的实例
     * @return {boolean}    是否是有效的Date类型时间
     */
    isDateObject: function(date){
        return isNaN(date.getTime());
    },

    /**
     * 验证format是否合法
     * @param {String} format  验证的format
     * @return {boolean} 验证结果
     */
    checkFormat: function(format) {
        let splitFormat = format.split(" ");
        if(splitFormat.length < 1){
            return false;
        }else {
            let leftFormat = splitFormat[0].split(("-"));
            const modeList = ["YYYY","MM","dd"];
            if(!this.contrast(leftFormat,modeList))
                return false;
            if (splitFormat.length == 2){
                let rightFoomat = splitFormat[1].split(":");
                const mode = ["HH","mm","ss"];
                if(!this.contrast(rightFoomat,mode)){
                    return false;
                }
            }
            return true;
    }
},

    /**
     * 对比两个数组是否是一致的
     * @param targetList 目标list数组
     * @param modeList     对比list数组
     * @return {boolean}    对比结果
     */
    contrast: function(targetList, modeList) {
        for (let i = 0; i < targetList.length; i++){
            let f1 = targetList[i];
            let f2 = modeList[i];
            if(f1 != f2){
                return false;
            }
        }
        return true;
},
    /**
     * 把时间重置到当天的 00:00:00的这个时间
     * @param {Date} date  传入时间
     * @return {Date} 重置时间
     */
    initZeroDate: function (date) {
        let zeroTime  = this.parseStringDate(date,"YYYY-MM-dd", false);
        return this.parseDateObject(zeroTime);
    }

};
export default dateUtils;