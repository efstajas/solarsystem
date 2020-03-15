<template lang="pug">
  div#SolarSystem
    input(type="range" v-model="speedSliderValue" min="0" max="800" value="100")#slider
    #line
    #planets
      Planet(ref="mercury" tone="C4")
      Planet(ref="venus" tone="E4")
      Planet(ref="earth" tone="G4")
      Planet(ref="mars" tone="B4")
      Planet(ref="jupiter" tone="D5")
      Planet(ref="saturn" tone="G5")
      Planet(ref="uranus" tone="B5")
      Planet(ref="neptune" tone="B4")
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

@Component({
  components: {
    Planet,
  },
})
export default class SolarSystem extends Vue {
  speedSliderValue = '100';

  planets: { i: Planet; s: number; r: number }[] | null = null;

  angles: { index: number; a: number }[] = [];

  circles: number[] = [];

  async mounted() {
    await this.$nextTick();

    this.planets = [
      { i: this.$refs.mercury as Planet, s: 1.2, r: 100 },
      { i: this.$refs.venus as Planet, s: 2.2, r: 200 },
      { i: this.$refs.earth as Planet, s: 2.4, r: 250 },
      { i: this.$refs.mars as Planet, s: 2.3, r: 300 },
      { i: this.$refs.jupiter as Planet, s: 1.8, r: 340 },
      { i: this.$refs.saturn as Planet, s: 1.6, r: 390 },
      { i: this.$refs.uranus as Planet, s: 1.7, r: 420 },
    ];

    this.setCircles();
    this.loop();
  }

  setCircles() {
    if (!this.planets) return;

    this.planets.forEach((planetConfig) => {
      this.circles.push(planetConfig.r);
    });
  }

  loop() {
    if (!this.planets) return;

    this.planets.forEach((planetConfig, index) => {
      const radius = planetConfig.r;

      const el = planetConfig.i.$el as HTMLDivElement;

      const cx = (window.innerWidth / 2) - el.offsetWidth / 2;
      const cy = (window.innerHeight / 2) - el.offsetHeight / 2;

      if (!this.angles[index]) {
        this.angles[index] = {
          index,
          a: 0,
        };
      }

      const angle = this.angles[index].a;

      const x = cx + radius * Math.cos((angle * Math.PI) / 180);
      const y = cy + radius * Math.sin((angle * Math.PI) / 180);

      el.style.backgroundColor = 'red';
      el.style.transform = `translate(${x}px, ${y}px)`;

      this.angles[index].a += planetConfig.s * (parseInt(this.speedSliderValue, 10) / 100);
      if (angle >= 360) {
        planetConfig.i.sound();
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
