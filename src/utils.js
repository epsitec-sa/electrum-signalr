'use strict';

/******************************************************************************/

export function getMethodNames (instance) {
  const type  = Object.getPrototypeOf (instance);
  const names = Object.getOwnPropertyNames (type);
  return names.filter (name => name !== 'constructor' && instance[name] instanceof Function);
}

export function inject (client, instance) {
  for (let name of getMethodNames (instance)) {
    client[name] = instance[name].bind (instance);
  }
}

/******************************************************************************/

export function setupProxy (proxy, factory) {
  inject (proxy.client, factory ());
}

/******************************************************************************/
