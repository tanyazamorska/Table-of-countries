"use strict";

var countries = [{
  country: "Italy",
  capital: "Rome",
  currency: "EUR",
  flag: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/125px-Flag_of_Italy.svg.png",
  isVisited: false,
  priorityToVisit: 2
}, {
  country: "Austria",
  capital: "Vienna",
  currency: "EUR",
  flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/125px-Flag_of_Austria.svg.png",
  isVisited: true,
  priorityToVisit: 1
}, {
  country: "U.K",
  capital: "London",
  currency: "GBP",
  flag: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/125px-Flag_of_the_United_Kingdom.svg.png",
  isVisited: false,
  priorityToVisit: 3
}, {
  country: "Spain",
  capital: "Madrid",
  currency: "EUR",
  flag: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/125px-Flag_of_Spain.svg.png",
  isVisited: false,
  priorityToVisit: 5
}, {
  country: "Norway",
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
    '<th id="country">Country</th>' +
    '<th id="capital">Capital</th>' +
    '<th id="currency">Currency</th>' +
    '<th>Flag</th>' +
    '<th id="isVisited">Visited</th>' +
    '<th id="priorityToVisit">Priority to visit</th>' +
    '<th>Actions</th></div>');

  // заповнюємо таблицю
  countries.forEach(function (item, i, arr) {
    var num = i + 1;
    $('table tr:last-child').after('<tr>' +
      '<td>' + num + '</td>' +
      '<td>' + item.country + '</td>' +
      '<td>' + item.capital + '</td>' +
      '<td>' + item.currency + '</td>' +
      '<td><img src=' + item.flag + '></td>' +
      '<td>' + item.isVisited + '</td>' +
      '<td>' + item.priorityToVisit + '</td>' +
      '<td><button type="button" class="btn btn-danger btn-xs remove">remove</button></td></tr>');
  });
}

var obj = {
  flag1: true,
  flag2: true,
  flag3: true,
  flag4: true,
  flag5: true
};

refresh();

function refresh() {
  $('#content').remove();
  createAndFillTable();
  addRemoveListener();
  addTextListener();
  addSortListener('country','flag1', 'Country');
  addSortListener('capital', 'flag2', 'Capital');
  addSortListener('currency', 'flag3', 'Currency');
  addSortListener('isVisited', 'flag4', 'Visited');
  addSortListener('priorityToVisit', 'flag5', 'Priority to visit');
}

// додаємо об`єкт до масиву
$('#add').on('click', function (event) {
  event.preventDefault();
  var newCountry = {
    country: $('#addCountry').val(),
    capital: $('#addCapital').val(),
    currency: $('#addCurrency').val(),
    flag: $('#addFlag').val(),
    isVisited: $('input[type="checkbox"]').is(':checked'),
    priorityToVisit: +($('#addPriority').val())
  };
  countries.push(newCountry);
  refresh();

  $("input").val('');
  $('input[type="checkbox"]').prop('checked', false);
});

// сортировка
function addSortListener(key, x, countriesKey) {
  obj[x] = !obj[x];
  $('#' + key).on('click', function () {
    if (!obj[x]) {
      countries  = _.sortBy(countries, [key]);
      refresh();
      $('#' + key).html(countriesKey + '<span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>');
    } else {
      countries = _.sortBy(countries, [key]);
      countries = _.reverse(countries);
      refresh();
      $('#' + key).html(countriesKey + '<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>');
    }
  });
}

// видаляємо об`єкт із масиву
function addRemoveListener() {
  $(".remove").on('click', function () {
    var index = $(this).parent('td').parent('tr').index();
    countries.splice(index - 1, 1);
    refresh();
  });
}

// змінюємо об`єкти в масиві
function addTextListener() {
  $('td').on('click', function () {
    var indexTr = $(this).parent('tr').index();
    //countries[indexTr-1]; // obj
    var keys = Object.keys(countries[indexTr - 1]); // keys in obj
    var index = $(this).index();
    var value = keys[index - 1]; // key

    var td = $(this).html('<input type="text" class="form-control" value=' + countries[indexTr - 1][value] + '>');
    var input = $('.form-control:text');
    $(input).focus();

    // переміщення курсору
    $(input).on('click', function (event) {
      event.stopPropagation();
    });

    $(input).focusout(function (event) {
      event.preventDefault();
      var newVal = $(input).val();
      countries[indexTr - 1][value] = newVal;
      refresh();
    });

    $(input).keyup(function (event) {
      if (event.keyCode === 27) {
        refresh();
      }
    });

    // альтернативний шлях відпрацьовує enter
    $(input).keyup(function (event) {
      if (event.keyCode === 13) {
        var nVal = $(input).val();
        countries[indexTr - 1][value] = nVal;
        refresh();
      }
    });
  });
}

// активна кнопка, коли форма заповнена
$('form').change(function () {
  if ($('#addCountry').val() != ''
    && $('#addCapital').val() != ''
    && $('#addCurrency').val() != ''
    && $('#addFlag').val() != ''
    && $('#addPriority').val() != '') {
    $('#add').removeAttr('disabled');
  } else {
    $('#add').attr('disabled', 'disabled');
  }
});



