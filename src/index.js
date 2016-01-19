'use strict';

var jQuery = require ('jquery');

window.$ = jQuery;
window.jQuery = jQuery;

require ('ms-signalr-client');



module.exports = {
  connect: function connect (url) {
    return jQuery.connection (url);
  }
};
