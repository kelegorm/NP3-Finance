/**
 * Created with JetBrains WebStorm.
 * User: Маша
 * Date: 26.11.13
 * Time: 15:37
 * To change this template use File | Settings | File Templates.
 */
var tagsTemplate = function (item) {
    var result='';
    for (var i=0; i<item.tags.length;i++) {
        result+='<span class="label itemTags">'+item.tags[i]+'</span>'
    }
    return result;
}

var buyTemplate = function (item){
    return '<div class="item">' +
                '<span class="itemName">'+item.name+'</span>' +
                '<div class="pull-right">' +
                    tagsTemplate(item)+
                     '<span class="itemPrice">'+item.price+'</span>'  +
                     '<span class="icon-remove"></span>'+
                '</div>' +
           '</div>';
}
//возвращает название, теги и цену одной покупки в виде html-элемента

var markToday = function (date) {
    var result='';
    if (date==getToday()) {
        result+= '<p class="muted">Today</p>'
    }
    return result;
}
//определяет есть ли данные за сегодняшнее число и в зависимости от этого дописывает Today или рисует форму ввода


var slideInputForm = function () {
    $('.btnAddTable').click(function () {
        $('.input-form').addClass('navbar-fixed-top');
        $('.input-form').slideDown(300);
        $('body').animate({paddingTop: '250px'},300);
    })
};
//рисует форму ввода по нажатию на кнопку Add

var dayTemplate =function(date,total,itemes){
    var result;
    result='<div class="day-item row" data-id="'+date+'" id="'+date+'">'+
        '<div class="date-column span2 bold">'+
        date+
        markToday(date)+
        '</div>' +
        '<div class="table-column span7">'+
        itemes+
        '</div>' +
        '<div class="total-column span2 bold">'+
        total+
        '</div>' +
        '<div class="button-column span1">'+
        '<button class="btn btnAddTable">Add</button>'+
        '</div>' +
        '</div>';

//    slideInputForm();
    return result;
};
//возвращает все данные за день в виде html-элемента

var dateListTemplate = function (quantityLI) {
    var today = new Date();
    var monthToday=today.getMonth();
    var yearToday=today.getFullYear();
    var monthArray=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var readableMonth=monthArray[monthToday];
    var dayArray=daysList(quantityLI);
    var dateArray=[];
    var result = '<ul class="date-list">'
    for (var i=0;i<dayArray.length;i++){
        dateArray[i]='';
        dayToAdd=lessTenAddZero(dayArray[i].day);
        monthtoAdd=lessTenAddZero(dayArray[i].month+1);
        dateArray[i]='<span>'+dayToAdd+'</span>'+' '+'<small>'+ monthArray[dayArray[i].month]+'</small>';

        if (i===0){dateArray[i]+='<div class="muted pull-right">Today</div>';}

        result+='<li data-id='+dayToAdd+'/'+monthtoAdd+'/'+dayArray[i].year+'><a href="#'+dayToAdd+'/'+monthtoAdd+'/'+dayArray[i].year+'">'+dateArray[i]+'</a></li>';
    }
    result+='</ul>';
    $('.day-choose').prepend(result);
};
//формирует html-список дат с помощью daysList