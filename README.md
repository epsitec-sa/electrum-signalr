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
