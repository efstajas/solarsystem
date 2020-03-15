<template lang="pug">
  div#Planet
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import outputModule from '@/store/modules/output.module';

@Component
export default class Planet extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop() tone!: string;

  outputModule = getModule(outputModule, this.$store);

  public sound() {
    if (
      this.outputModule.isInitalized
      && this.outputModule
      && this.outputModule.output
    ) {
      this.outputModule.output.playNote(this.tone);
    }
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
