'use strict';

var jQuery = require ('jquery');

window.$ = jQuery;
window.jQuery = jQuery;

require ('ms-signalr-client');

/******************************************************************************/

import {setupProxy} from './utils.js';

/******************************************************************************/

export class HubLoader {
  constructor (hubName) {
    this._hubName = hubName;
  }

  get hubName () {
    return this._hubName;
  }

  get hubProxy () {
    return this.connection[this._hubName];
  }

  get connection () {
    return jQuery.connection;
  }

  get hub () {
    return this.connection.hub;
  }

  load (hubUrl, ownUrl, ready) {
    jQuery.getScript (hubUrl + '/hubs')
      .done ((script, textStatus) => { /*jshint unused:false*/
        this.configureHub (hubUrl, ownUrl);
        this.notifyReady (ready);
      })
      .fail ((jqxhr, settings, exception) => { /*jshint unused:false*/
        /* handle error */
      });
  }

  configureHub (hubUrl, ownUrl) {
    const hub = this.hub;
    hub.error (err => this.onError (err));
    hub.logging = false;
    hub.url = hubUrl;
    hub.qs = 'from=' + ownUrl;
  }

  notifyReady (ready) {
    if (ready) {
      ready (this);
    }
  }

  setupProxy (factory) {
    setupProxy (this.hubProxy, factory);
  }

  start () {
    this.hub
      .start ()
      .done (() => this.onConnected ())
      .fail (() => this.onConnectFailed ());
  }

  onConnected () {
    console.log (`SignalR hub connected; ID=${this.hub.id}, transport=${this.hub.transport.name}`);
  }

  onConnectFailed () {
    console.log (`SignalR failed to connect hub; URL=${this.hub.url}`);
  }

  onError (error) {
    console.log (`Error: ${error}`);
  }

  static get jQuery () {
    return jQuery;
  }
}

/******************************************************************************/
