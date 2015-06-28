/*global ./bower_components/jquery/dist/jquery.min.js*/
window.addEventListener('load', function onLoad() {
  'use strict';
  // Function that work with success answer from server
  function listParser(data) {
    var i;
    localStorage.setItem('users', data);
    function userSort(user) {
      function liCreator(role) {
        var $li = $('<li>').html('<h2>' + user.name + '</h2><h3>' + user.phone + '</h3>');
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
    for (i = 0; i < data.length; i++) {
      userSort(data[i]);
    }
    // Remake to one function!!!
    (function makeItSortable() {
      // This function send request and work with response
      function receiveLiHandler(event) {
        $.ajax(window.url + '/' + event.id, {
          method: 'POST',
          data: { status: event.role },
          error: function onError() {
            console.log('Ajax reject!');
          }
        });
      }
      $('.active ul').sortable({connectWith: '.redcard ul'}, {receive: receiveLiHandler}).disableSelection();
      $('.redcard ul').sortable({connectWith: '.active ul'}).disableSelection();
      $('.removed ul').sortable().disableSelection();
    })();
  }
  $.get(window.url, null, listParser, 'json');
});
