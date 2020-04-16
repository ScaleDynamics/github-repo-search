/*
 * Copyright 2020 ScaleDynamics SAS. All rights reserved.
 * Licensed under the MIT license.
 */

'use strict';

// init WarpJS
import '@warpjs/engine';

import Vue from 'vue';
import App from './app.vue';

// init Vue.js
new Vue({
  el: '#app',
  render: h => h(App)
});
