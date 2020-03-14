<template lang="pug">
  div#app
    SolarSystem(:synth="synth")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Planet from '@/components/Planet/Planet.vue';
import SolarSystem from '@/components/SolarSystem.vue';
import Tone from 'tone';

@Component({
  components: {
    Planet,
    SolarSystem,
  },
})
export default class App extends Vue {
  reverb = new Tone.Reverb(50).toMaster();

  synth = new Tone.PolySynth(8, Tone.Synth, {
  }).chain(
    new Tone.Gain(0.1),
    this.reverb,
    new Tone.Tremolo().start(),
    new Tone.Gain(0.1),
  )

  mounted() {
    this.reverb.generate();
  }
}
</script>

<style lang="sass">
body
  margin: 0
</style>
