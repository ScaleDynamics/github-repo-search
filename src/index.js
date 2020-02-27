/*
 * Copyright 2020 ScaleDynamics SAS. All rights reserved.
 * Licensed under the MIT license.
 */

'use strict';

import App from './app.vue';
import engine from '@warpjs/engine';
import Vue from 'vue';

// init WarpJS
engine.init();

// init Vue.js
new Vue({
  el: '#app',
  render: h => h(App)
});
