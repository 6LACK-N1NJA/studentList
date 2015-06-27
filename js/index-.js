(function mainInteraction() {
  'use strict';

  function extend(Child, Parent) {
    var F = function ext() {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.supperclass = Parent.prototype;
  }
  /**
   * Here I try to realise MVC.
   * I do it in one file,cause it part of task.
   * So, let's start!
   *
   *
   *  ------Model-------
   *
   */
  function User() {
    this.name = name;
    this.status = status;
    this.phone = phone;
    this.id = id;
  }
  function UserStorage() {

  }
  UserStorage.prototype.usersListParser = function (data) {
    var users;
     users = _.map(data, function statusSetter(prop, key, ) {
       var user = _.create(User.prototype, us);
    })
  };
// -------View-------
  function domConstructor (users, callback) {

  }
// -------Controller--------
  function replaceListener (selector, callback) {

  }
  function sortListener(selector) {

  }
// Action!
  $(function onLoad() {
    });
})();
