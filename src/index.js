'use strict';

var jQuery = require ('jquery');

window.$ = jQuery;
window.jQuery = jQuery;

require ('ms-signalr-client');

/******************************************************************************/

export class HubLoader {
  constructor (hubName) {
    this._connection = null;
    this._hubName = hubName;
  }

  get hubProxy () {
    return this._connection[this.hubName];
  }

  get connection () {
    return this._connection;
  }

  get hub () {
    return this._connection.hub;
  }

  load (hubUrl, ownUrl, ready) {
    jQuery.getScript (hubUrl + '/hubs')
      .done ((script, textStatus) => {
        this.configureHub (hubUrl, ownUrl, ready);
      })
      .fail ((jqxhr, settings, exception) => {
        /* handle error */
      });
  }

  configureHub (hubUrl, ownUrl, ready) {
    let hub = this.hub;
    hub.error (err => this.onError (err));
    hub.logging = false;
    hub.url = hubUrl;
    hub.qs = 'from=' + ownUrl;
    ready (this);
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
