import Vue from 'vue';
import Vuex from 'vuex';

import outputs from './modules/output/output.module';
import planets from './modules/planets/planets.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    outputs,
    planets,
  },
});
