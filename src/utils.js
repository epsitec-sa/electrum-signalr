'use strict';

import {getInstanceMethodNames} from 'electrum-utils';

/******************************************************************************/

export function inject (client, instance) {

  const names = getInstanceMethodNames (instance);
  const len = names.length;

  for (let i = 0; i < len; ++i) {
    const name = names[i];
    if (!name.startsWith ('_')) {
      client[name] = instance[name].bind (instance);
    }
  }
}

/******************************************************************************/

export function setupProxy (proxy, factory) {
  inject (proxy.client, factory ());
}

/******************************************************************************/
