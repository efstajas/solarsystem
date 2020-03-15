p<template lang="pug">
  #PlanetWindow
    #wrapper
      h2#name # {{ number }}
      #speed
        span Speed:
        input(
          type="range"
          :value="String(planet.speed * 100)"
          @input="handleSpeedChange"
          min="0"
          max="2000"
        )
      #orbitRadius
        span Orbit Size:
        input(
          type="range"
          min="0"
          max="600"
          @input="handleOrbitRadiusChange"
          :value="String(planet.orbitRadius)"
        )
      #tone
        span Tone:
        input(
          type="text"
          :value="planet.tone"
          @input="handleToneChange"
        )
      button#delete(@click="handleDelete") Delete
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Watch,
  Vue,
} from 'vue-property-decorator';

import { getModule } from 'vuex-module-decorators';
import PlanetStore from '@/store/modules/planets/planets.module';
import { PlanetConfig } from '../../../store/modules/planets/planets.types';

@Component
export default class PlanetWindow extends Vue {
  planetStore = getModule(PlanetStore, this.$store);

  @Prop() readonly planet!: PlanetConfig;

  get number() {
    return this.planetStore.planets.indexOf(this.planet) + 1;
  }

  handleSpeedChange(e: Event) {
    this.planetStore.updatePlanet({
      id: this.planet.id,
      update: {
        speed: parseInt((e.target as HTMLInputElement).value, 10) / 100,
      },
    });
  }

  handleOrbitRadiusChange(e: Event) {
    this.planetStore.updatePlanet({
      id: this.planet.id,
      update: {
        orbitRadius: parseInt((e.target as HTMLInputElement).value, 10),
      },
    });
  }

  handleToneChange(e: Event) {
    this.planetStore.updatePlanet({
      id: this.planet.id,
      update: {
        tone: (e.target as HTMLInputElement).value,
      },
    });
  }

  handleDelete() {
    this.planetStore.removePlanet(this.planet.id);
  }
}
</script>

<style lang="sass" scoped>
#wrapper
  padding: 16px
  border: 1px solid rgba(255,255,255,0.2)
  > *
    margin-bottom: 8px
</style>
