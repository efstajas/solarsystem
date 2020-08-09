<template lang="pug">
  div#SolarSystem
    SolarSlider(v-model="speedSliderValue")#slider
    #line
    #planets
      Planet(v-for="planet in planets" :tone="planet.tone" :ref="planet.id" :radius="planet.radius")
    svg(height="100vh" width="100vw")
      circle(cx="50%" cy="50%" r="50" fill="white")#sun
      g
        circle(
          v-for="circle in circles"
          cx="50%"
          cy="50%"
          :r="circle"
          fill="none"
          stroke="white"
        )#circleLine
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Planet from '@/components/Planet/Planet.vue';
import SolarSlider from '@/components/SolarSlider/SolarSlider.vue';

import { getModule } from 'vuex-module-decorators';
import PlanetStore from '@/store/modules/planets/planets.module';

@Component({
  components: {
    Planet,
    SolarSlider,
  },
})
export default class SolarSystem extends Vue {
  speedSliderValue = '100';

  planetStore = getModule(PlanetStore, this.$store);

  get planets() {
    return this.planetStore.planets;
  }

  get circles() {
    return this.planetStore.orbitSizes;
  }

  angles: {
    index: number;
    a: number;
    millis: number;
  }[] = [];

  async mounted() {
    await this.$nextTick();
    this.loop();
  }

  loop() {
    if (!this.planets) return;

    this.planets.forEach((planetConfig, index) => {
      const { orbitRadius } = planetConfig;

      const instance = (this.$refs[planetConfig.id] as Vue[])[0] as Planet;
      const el = instance.$el as HTMLDivElement;

      const cx = (window.innerWidth / 2) - planetConfig.radius / 2;
      const cy = (window.innerHeight / 2) - planetConfig.radius / 2;

      if (!this.angles[index]) {
        this.angles[index] = {
          index,
          a: 0,
          millis: (new Date().getTime()),
        };
      }

      const angle = this.angles[index].a;

      const x = cx + orbitRadius * Math.cos((angle * Math.PI) / 180);
      const y = cy + orbitRadius * Math.sin((angle * Math.PI) / 180);

      el.style.backgroundColor = 'red';
      el.style.transform = `translate(${x}px, ${y}px)`;

      const millisSinceLastUpdate = (new Date()).getTime() - this.angles[index].millis;

      console.log(this.angles[index].a, millisSinceLastUpdate);

      this.angles[index].a
        += (millisSinceLastUpdate / 4)
        * planetConfig.speed
        * (parseInt(this.speedSliderValue, 10) * 0.01);
      this.angles[index].millis = (new Date()).getTime();

      if (angle >= 360) {
        instance.sound();
        this.angles[index].a = angle - 360;
      }
    });

    requestAnimationFrame(this.loop);
  }
}
</script>

<style lang="sass" scoped>
#SolarSystem
  background-color: black
  #line
    position: fixed
    height: 2px
    background-color: white
    left: 50vw
    top: 50vh
    width: 50vw
    height: 1px
    opacity: .2
  #circleLine
    opacity: .2
  #slider
    position: absolute
    z-index: 1000
    width: 10vw
    top: 50px
    left: calc(50% - 5vw)
</style>
