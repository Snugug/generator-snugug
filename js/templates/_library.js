/*
 * The global <%= name %> object that contains all functionality.
 *
 */
(function (<%= camel %>) {
  'use strict';

  var <%= classy %>Struct = function <%= classy %>Struct() {
    var self = this;
  };

  //////////////////////////////
  // We only ever want one instance of state
  //////////////////////////////
  <%= camel %> = <%= camel %> || new <%= classy %>Struct();

  //////////////////////////////
  // All of the various exports!
  //////////////////////////////
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = <%= camel %>;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return <%= camel %>;
    });
  } else {
    window.<%= camel %> = <%= camel %>;
  }
}(window.<%= camel %>));
