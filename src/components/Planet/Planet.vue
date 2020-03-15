<template lang="pug">
  #wrapper
    div#Planet()
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import outputModule from '@/store/modules/output/output.module';

@Component
export default class Planet extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop() tone!: string;

  @Prop() radius!: number;

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
  height: 32px
  width: 32px
  position: absolute
  border-radius: 16px
  background-color: white
</style>
