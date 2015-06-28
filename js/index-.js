$(function onLoad() {
  'use strict';
  var userStorage = {};
  var $activeList = $('.active ul');
  var $redList = $('.redcard ul');
  var $removedList = $('.removed ul');
  /**
   * Here I try to realise MVC.
   * I do it in one file,cause it part of task.
   * So, let's start!
   *
   *
   *  ------Model-------
   *
   */
  function User(user) {
    this.name = user.name;
    this.status = user.status;
    this.phone = user.phone;
    this.id = user.id;
  }
  userStorage.controlRouter = function (usersList) {
  listConstructor(usersList);
  domEventListeners();
  };
  userStorage._setLocalStorage = function(users, sequence) {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('sequence', JSON.stringify(sequence));
    userStorage.controlRouter(users);
  };
  // Return array with two objects: user list and user sequence from localStorage
  userStorage.getLocalStorage = function() {
    var u;
    var s;
    u = localStorage.getItem('users');
    s = localStorage.getItem('sequence');
    return [JSON.parse(u), JSON.parse(s)];
  };
  userStorage.clearLocalStorage = function () {
    localStorage.removeItem('users');
    localStorage.removeItem('sequence');
  };
  userStorage.userListParser = function(data) {
    if (localStorage.getItem('users')) {
      var userList = localStorage.getItem('users');
      this.users = userList;
      userStorage.controlRouter(userList);
    } else {
      this.users = _.map(data, function statusSetter(us) {
        // Создаем объект из конструктора User, определяем ему полученные свойства
        return _.create(User.prototype, us);
      });
    }
    userStorage._setLocalStorage(this.users, data);
  };
// -------View-------
  function listConstructor (data) {
    function userSort(user) {
      function liCreator(role) {
        var $li = $('<li>').attr("id", user.id).html('<h3>' + user.name + '</h3><h4>' + user.phone + '</h4>');
        $(role).append($li);
      }
      if (user.status === 'active') {
        liCreator('.active ul');
        return;
      }
      if (user.status === 'redcard') {
        liCreator('.redcard ul');
        return;
      }
      if (user.status === 'removed') {
        liCreator('.removed ul');
      }
    }
    // Here we parse our associate massive
    _.map(data, userSort);
  }
// -------Controller--------
  function domEventListeners() {
    function postMaker(status) {
      return function(event, ui) {
        $.ajax(window.url + '/' + ui.item[0].id, {
          type: 'POST',
          contentType: 'application/json',
          data: {status: status}
        });
      }
    }
    $activeList.sortable({
      connectWith: ['.redcard ul', '.removed ul'],
      receive: postMaker("active")
    }).disableSelection();
    $redList.sortable({
      connectWith: ['.active ul', '.removed ul'],
      receive: postMaker("redcard")
    }).disableSelection();
    $removedList.sortable({
      receive: postMaker("removed")
    }).disableSelection();
    $activeList.on('sortreceive', postMaker('active'));
    $redList.on('sortreceive', postMaker('redcard'));
    $removedList.on('sortreceive', postMaker('removed'));
  }
// Action!
    userStorage.clearLocalStorage();
    $.get(window.url, null, userStorage.userListParser, 'json');
});
