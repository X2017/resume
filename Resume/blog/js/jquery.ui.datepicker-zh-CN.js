jQuery(function($){  
    $.datepicker.regional['zh-CN'] = {
        prevText: '上：mm 月',  
        nextText: '下：mm 月',
        currentText: '今天：dd 号',
        closeText: '关闭',
        monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],  
        monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],  
        dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],  
        dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],  
        dayNamesMin: ['日','一','二','三','四','五','六'],  
        // weekHeader: '周',
        // yearSuffix: '年',
        dateFormat: 'yy-mm-dd',//格式
        firstDay: 1,
        isRTL: false,
        showAnim:false,//显示效果
        showOn:'both',//按钮和选项框触发日历
        changeYear:true,//下拉年
        changeMonth:true,//下拉月
        yearRange:'1950:2150',//下拉年份
        numberOfMonths:1,//界面显示多少个月份
        showMonthAfterYear: true,//在标题中的年份后显示月份
        showButtonPanel:true,//今天 关闭 按钮
        showMonthAfterYear:true,//把月放在年的后面
        showOtherMonths:true,//显示前后月
        selectOtherMonths:true,//选择前后月
        navigationAsDateFormat:true,// prevText:'上：mm 月',  mm显示日期
        // hideIfNoPrevNext:true,//如果没有上下月隐藏按钮
        buttonImageOnly:true,//触发日历按钮使用图片代替
        // beforeShowDay: $.datepicker.noWeekends, //禁用周末
    };  
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);  
});  