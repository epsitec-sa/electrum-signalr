# electrum-signalr

[![NPM version](https://img.shields.io/npm/v/electrum-signalr.svg)](https://www.npmjs.com/package/electrum-signalr)

This wrapper hides the depencies to SignalR and jQuery, so that it gets possible
to use ES6 `import` to get a properly configured SignalR instance, and then use
the `HubLoader` class to establish a bidirectional connection with the SignalR
server.

```javascript
import SignalR from 'electrum-signalr';

const hubUrl = '...';
const ownUrl = '...';
let loader = new SignalR.HubLoader ('fooHub');
loader.Load (hubUrl, ownUrl, () => console.log ('Ready'));
```

# The HubLoader class

## Methods

The `HubLoader` class defines following public methods:

* `constructor (hubName)` &rarr; specify the name of the SignalR hub.
* `load (hubUrl, ownUrl, ready)` &rarr; load the proxy for the given hub;
  the URL of the hub and of the client endpoint need to be provided; `ready`
  will be called with the instance of the `HubLoader` when the proxy is
  ready for use. Typically, `ready(loader)` should call `loader.start()`.
* `start ()` &rarr; start the communication between the proxy and the
  distant hub; this will establish the SignalR communication channel.

## Getters

The `HubLoader` class defines following public getters:

* `hub` &rarr; the client-side hub instance.
* `hubProxy` &rarr; the proxy to the server hub.
* `connection` &rarr; the SignalR connection.

## Static getters

The `HubLoader` class exposes jQuery as a static getter:

```javascript
const jQuery = SignalR.HubLoader.jQuery ();
```

## Internal notifications

The `HubLoader` calls _life cycle methods_ when things happen:

* `onConnected ()` &rarr; the client and the server hubs are now connected.
* `onConnectFailed ()` &rarr; the connection failed.
* `onError (error)` &rarr; there was an error while exchanging messages between
  the hubs.

You can overload these methods if you need to handle the notifications.
Otherwise, they will just display messages on the console.
