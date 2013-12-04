/**
 * Created with JetBrains WebStorm.
 * User: Маша
 * Date: 26.11.13
 * Time: 15:34
 * To change this template use File | Settings | File Templates.
 */

var calculateTotal = function (data){
    var result=0;
    for (var i=0;i<data.length;i++){
        result+=data[i].price;
    }
    return result;
}
//считает итоговую сумму за день

var getToday =function () {
    var today = new Date();
    var result='';
    var dayToday=today.getDate();
    var monthToday=today.getMonth()+1;
    var yearToday=today.getFullYear();
    result=result+dayToday+'/'+monthToday+'/'+yearToday;
    return result;
}
//возвращает сегодняшнее число в формате дд/мм/гггг

lessTenAddZero = function (number){
    resultString='';
    resultString=((number<10)?'0':'')+number;
    return resultString;
}