/**
 * Created with JetBrains WebStorm.
 * User: Маша
 * Date: 31.10.13
 * Time: 11:34
 * To change this template use File | Settings | File Templates.
 */

var initialRender = function (dayArray) {
    for (var i=0;i<dayArray.length;i++) {
        var day=dayArray[i];
        var dataPerDay=model[day];
        showDayPerDay(dataPerDay);
    }
    dateListTemplate(7);
}
//рисует начальный экран

var showDayPerDay = function (data) {
    var itemes='';
    for (var i=0; i<data.length; i++) {
        itemes+=buyTemplate(data[i]);
    }
//формирует html-элемент, в котором есть все покупки

    var date=data[0].date;
    var total=calculateTotal(data);
    var dayHTML=dayTemplate(date,total,itemes);
    $('#dayList').append(dayHTML);
}
//добавляет данные за день в html-файл

var getData = function (){
    function Item (date,name,tags,price) {
        this.date=date;
        this.name=name;
        this.tags=tags;
        this.price=price;
    }

    // todo вместо создания кучи перменных можно было сразу писать это в массив, через запятую.
    // Так проще было бы редактировать
    var item1=new Item('08/11/2013',"Макароны",['крупы', 'полуфабрикаты'],40);
    var item2=new Item('08/11/2013',"Яблоки",['фрукты'],25);
    var item3=new Item('11/11/2013',"Чипсы",['вкусности'],35);
    var item4=new Item('15/11/2013',"Конфеты",['вкусности'],135);
    var item5=new Item('14/11/2013',"Мясо",['мясо'],250);
    var item6=new Item('18/11/2013',"Рыба",['рыба'],400);
    var item7=new Item('22/11/2013',"Помидоры",['овощи'],70);
    var item8=new Item('17/11/2013',"Манка",['крупы','полуфабрикаты'],70);
    var item9=new Item('20/11/2013',"Кешью",['орехи'],70);
    var item10=new Item('13/11/2013',"Танцы",['хобби','услуги'],1500);
    var item11=new Item('16/11/2013',"Проезд метро",['транспорт'],70);
    var item12=new Item('17/11/2013',"Мандарины",['фрукты'],70);

    return [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12];
}
//возвращает данные по покупкам

var getDateIndex = function(date) {
    var dateNumber = date.split('/');
    var result=Number(dateNumber[2]+dateNumber[1]+dateNumber[0]);
    return result;
}
//возвращает дату в числовом формате

var sortedDateIndex = function (array) {
    var dayArray=[]
    for (var day in array) {
         dayArray.push(day);
    };
    for (var i=0;i<dayArray.length-1;i++){
        for (var k=i+1;k<dayArray.length;k++){
            if(getDateIndex(dayArray[k])>getDateIndex(dayArray[i])) {
                var temp=dayArray[i];
                dayArray[i]=dayArray[k];
                dayArray[k]=temp;
            }
        }
    }

    return dayArray;
}
//возвращает массив отсортированных дат

var sortData = function (allData) {
    var result={};
    for (var i=0;i<allData.length;i++) {
         if (result.hasOwnProperty(allData[i].date)) {
             result[allData[i].date].push(allData[i])
         } else {
             result[allData[i].date]=[];
             result[allData[i].date].push(allData[i])
         }
    }
    return result;
}
//формирует из всех данных объект с ключами в виде дат

var daysList =function(quantityLI){
    var today = new Date();
    var dayToday=today.getDate();
    var dayArray=[];
    for (var i=0; i<quantityLI; i++) {
        dayArray[i]=dayToday-i;
        if (dayArray[i]<10) {
            dayArray[i]='0'+dayArray[i];
        }
    }
    return dayArray;
}
//возвращает массив дат для вывода выбиралки дат (начиная с сегодня, параметр - количество)
//добавить изменение месяца

var addNewItemToModel = function (date,newItem){
    if (model.hasOwnProperty(date)) {
        model[date].push(newItem);
    } else {
        model[date]=[];
        model[date].push(newItem);
    }
}
//добавляет новый элемент в модель

var addNewDay = function (date,item,model) {
    var dateArray=sortedDateIndex(model);
    var dayAfterDayToAdd;
    var viewNewDay=dayTemplate(date,item.price,item.name);
    var i=0;
    if (getDateIndex(dateArray[0])==getDateIndex(date)) {
        $('#dayList').find('[data-id="'+dateArray[1]+'"]').before(viewNewDay);
    } else {
        do {
            dayAfterDayToAdd=dateArray[i];
            i++;}
        while (getDateIndex(dateArray[i])>getDateIndex(date));
        $('#dayList').find('[data-id="'+dayAfterDayToAdd+'"]').after(viewNewDay);
    }
}
//рисует новый день (данных за который ещё не было)

var addNewItem = function (date,item) {
    var itemForAdd=buyTemplate(item);
    var total=calculateTotal(model[date]);
    $('#dayList').find('[data-id="'+date+'"]').children('.table-column').prepend(itemForAdd);
    $('#dayList').find('[data-id="'+date+'"]').children('.total-column').html(total);

}
//рисует новую покупку (день уже был в модели)

var getDataForm = function (array) {
    var result={};
    for (var i=0;i<array.length;i++){
        result[array[i].name]='';
        result[array[i].name]=array[i].value;
    }
    return result;
}

var addNewData = function (){
        $('#input-form').submit(function(event){
            event.preventDefault();
        var date=$('li.selected').data('id');
        var inputData=$(this).serializeArray();
        var newItem=getDataForm(inputData);
        newItem['date']=date;
        newItem.price=Number(newItem.price);

        newItem.tags=newItem.tags.split(',');
        for (var i=0; i<newItem.tags.length;i++) {
            newItem.tags[i]= $.trim(newItem.tags[i]);
        }
//очищаем введенные теги от пробелов в начале и в конце

        $(this)[0].reset();
//очищаем формы ввода

        model[date].push(newItem);
        addNewItem(date,newItem);

    $('ul.date-list li').removeClass('selected');
})
}
//добавляет по нажатию на кнопку новые данные и очищает формы ввода

var dateSelect = function (){
    $('li').click(function(){
        $('ul.date-list li').removeClass('selected');
        $(this).addClass('selected');
        var newDate=$('li.selected').data('id');
        var viewNewDay;
        var newItem={
            name: '',
            price: 0,
            tags: 'no tags',
            date: newDate
        };

        if (!model.hasOwnProperty(newDate)){
            addNewItemToModel(newDate,newItem);
            addNewDay(newDate,newItem,model)
        }
    })
};
//подсвечивает выбранное число (к выбранному элементу списка добавляется класс selected)

var hideInputForm = function (){
    $('.btnHide').click(function (){
//        $('.input-form').removeClass('navbar-fixed-top');
        $('.input-form').slideUp(300);
        $('body').stop(true, true).animate({paddingTop: '60px'},300);
    })
};

var getItemValues = function (element) {
   var result={};
   var commonParent=$(element).closest('.item');
   var name=commonParent.children('.itemName').text();
   var price=commonParent.children('.pull-right').children('.itemPrice').text();
   var date=commonParent.parent('.table-column').siblings('.date-column').text();

   var tags=[];
   var tagsQuantity=commonParent.children('.pull-right').children('.itemPrice').siblings('.label').size();
    for (i=0;i<tagsQuantity;i++) {
       tags[i]=commonParent.children('.pull-right').find('.label:nth-of-type('+(i+1)+')').text();
   }

    result['name']=name;
    result['price']=Number(price);
    result['tags']=tags;
    result['date']=date;

    return result;
}

var removeItemFromModel = function (date,item) {
   model[date]._removeData(item);
}

var deleteItem = function () {
    $('.icon-remove').click(function () {
        var Item =getItemValues(this);
        removeItemFromModel(Item.date,Item);
        var itemToRemove = $(this).closest('.pull-right').parent('div');
        itemToRemove.remove();

        console.log (model);
    })
}
var model={};


$(document).ready (function (){
   var allData=getData();
   model=sortData(allData);

    //todo массив дней равен сортировке о индексу? Не очевидные названия
   var dayArray=sortedDateIndex(model);

    // todo кстати, наверное на стороне браузера нам вообще не нужно хранить модель как список покупок.
    // Нам важен только список, сгрупированный по дням. Если я ничего не забыл.

   initialRender(dayArray);
   dateSelect();
    hideInputForm();

    // Стоит объеденить все создания слушателей событий в одну функцию
   addNewData();
   deleteItem();
   console.log(dayArray);
});
