<template lang="pug">
  #PlanetConfigurator
    Window(title="Planets")
      #PlanetWindows
        PlanetWindow(v-for="planet in planets" :planet="planet").window
      button#addPlanet(@click="addPlanet") Add planet
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import Window from '@/components/Window';

import { getModule } from 'vuex-module-decorators';
import PlanetStore from '@/store/modules/planets/planets.module';

import PlanetWindow from './components/PlanetWindow.vue';

@Component({
  components: {
    Window,
    PlanetWindow,
  },
})
export default class PlanetConfigurator extends Vue {
  planetStore = getModule(PlanetStore, this.$store);

  get planets() {
    return this.planetStore.planets;
  }

  addPlanet() {
    this.planetStore.addPlanet({
      speed: 1,
      radius: 32,
      orbitRadius: this.planets.sort((a, b) => b.orbitRadius - a.orbitRadius)[0].orbitRadius + 50,
      tone: 'C3',
    });
  }
}
</script>

<style scoped lang="sass" src="./PlanetConfigurator.sass">
