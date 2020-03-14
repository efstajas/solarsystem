<template lang="pug">
  div#Planet
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Planet extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop() synth!: any;

  @Prop() tone!: string;

  public sound() {
    this.synth.triggerAttackRelease(this.tone, '8n');
  }
}
</script>

<style lang="sass" scoped>
#Planet
  position: absolute
  height: 32px
  width: 32px
  border-radius: 16px
  background-color: black
</style>
