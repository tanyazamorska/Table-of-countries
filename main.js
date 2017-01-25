"use strict";

var countries = [{
    name: "Italy",
    capital: "Rome",
    currency: "EUR",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/125px-Flag_of_Italy.svg.png",
    isVisited: false,
    priorityToVisit: 2
}, {
    name: "Austria",
    capital: "Vienna",
    currency: "EUR",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/125px-Flag_of_Austria.svg.png",
    isVisited: true,
    priorityToVisit: 1
}, {
    name: "U.K",
    capital: "London",
    currency: "GBP",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/125px-Flag_of_the_United_Kingdom.svg.png",
    isVisited: false,
    priorityToVisit: 3
}, {
    name: "Spain",
    capital: "Madrid",
    currency: "EUR",
    flag: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/125px-Flag_of_Spain.svg.png",
    isVisited: false,
    priorityToVisit: 5
}, {
    name: "Norway",
    capital: "Oslo",
    currency: "NOK",
    flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/125px-Flag_of_Norway.svg.png",
    isVisited: false,
    priorityToVisit: 4
}];

function createAndFillTable() {
    $('form').before('<div id="content"><table class="table table-bordered">' +
        '<tr id="header"></tr>' +
        '</table>');

    $('#header').append('<th>#</th>' +
        '<th>Name</th>' +
        '<th>Capital</th>' +
        '<th>Currency</th>' +
        '<th>Flag</th>' +
        '<th>Visited</th>' +
        '<th>Priority to visit</th>' +
        '<th>Actions</th></div>');

    // заповнюємо таблицю
    countries.forEach(function(item, i, arr) {
        var num = i + 1;
        $('table tr:last-child').after('<tr>' +
            '<td>' + num +'</td>'+
            '<td>' +item.name+' <button type="button" class="btn btn-default btn-xs edit">edit</button>' +'</td>' +
            '<td>' +item.capital+' <button type="button" class="btn btn-default btn-xs edit">edit</button>'+'</td>' +
            '<td>' +item.currency+' <button type="button" class="btn btn-default btn-xs edit">edit</button>'+'</td>' +
            '<td><img src='+item.flag +'>' +' <button type="button" class="btn btn-default btn-xs edit">edit</button>'+'</td>' +
            '<td>' +item.isVisited+' <button type="button" class="btn btn-default btn-xs edit">edit</button>'+'</td>' +
            '<td>' +item.priorityToVisit+' <button type="button" class="btn btn-default btn-xs edit">edit</button>'+'</td>' +
            '<td><button type="button" class="btn btn-danger btn-xs remove">remove</button></td></tr>');
    });
}
refresh();

function refresh() {
     $('#content').remove();
     createAndFillTable();
     addRemoveListener();
     addEditListener();
}

// додаємо об`єкт до масиву
$('#add').on('click', function(event) {
    event.preventDefault();
    var newCountry = {
        name: $('#addName').val(),
        capital: $('#addCapital').val(),
        currency: $('#addCurrency').val(),
        flag: $('#addFlag').val(),
        isVisited: $('input[type="checkbox"]').is(':checked'),
        priorityToVisit:  +($('#addPriority').val())
    };
    countries.push(newCountry);
    refresh();

    $("input").val('');
    $('input[type="checkbox"]').prop('checked', false);
});

// видаляємо об`єкт із масиву
function addRemoveListener() {
    $(".remove").on('click', function() {
        var index = $(this).parent('td').parent('tr').index();
        countries.splice(index - 1, 1);
        refresh();
    });
}

// змінюємо об`єкти в масиві
function addEditListener() {
    $('.edit').on('click', function() {
        var newValue = prompt("Enter a new value", "");
        var indexTr = $(this).parent('td').parent('tr').index();
        //countries[indexTr-1]; // obj
        var keys = Object.keys(countries[indexTr-1]); // keys in obj
        var index = $(this).parent().index();
        var value = keys[index - 1]; // key
        if (!!(newValue)) {
            countries[indexTr-1][value] = newValue;
        } else {
            countries[indexTr-1][value];
        }
        refresh();
    });
}

// активна кнопка, коли форма заповнена
$('form').change(function() {
    if ($('#addName').val() != ''
        && $('#addCapital').val() != ''
        && $('#addCurrency').val() != ''
        && $('#addFlag').val() != ''
        && $('#addPriority').val() != '') {
        $('#add').removeAttr('disabled');
    } else {
        $('#add').attr('disabled', 'disabled');
    }
});


