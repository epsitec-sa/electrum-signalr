'use strict';

var jQuery = require ('jquery');

window.$ = jQuery;
window.jQuery = jQuery;

var signalR = require ('ms-signalr-client');

module.exports = signalR;
