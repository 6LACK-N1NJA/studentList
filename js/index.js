/*global jquery*/
window.addEventListener('load', function onLoad() {
  'use strict';
  // Function that work with succses answer from server
  function listParser(data) {
    var i;
    function userSort(user) {
      function liCreator(role) {
        var $li = $('<li>').html('<h2>' + user.name + '</h2><h3>' + user.phone + '</h3>');
        $li.addClass(role.substring(1, 4));
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
    (function letSort() {
      $('.act').sortable({connectWith: '.red'});
      $('.red').sortable({connectWith: '.act'});
      $('.rem').sortable();
    })();
  }
  $.get(window.url, null, listParser, 'json');
});
