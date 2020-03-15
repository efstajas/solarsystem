<template lang="pug">
  div#app
    SolarSystem()
    #leftConfig
      DestinationConfigurator
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Planet from '@/components/Planet/Planet.vue';
import SolarSystem from '@/components/SolarSystem.vue';
import DestinationConfigurator from '@/components/DestinationConfigurator';
import { getModule } from 'vuex-module-decorators';
import outputModule from '@/store/modules/output.module';

@Component({
  components: {
    Planet,
    SolarSystem,
    DestinationConfigurator,
  },
})
export default class App extends Vue {
  outputModule = getModule(outputModule, this.$store);
}
</script>

<style lang="sass">
body
  margin: 0
  overflow: hidden
  font-family: "Inter"
  color: white
#leftConfig, #rightConfig
  position: fixed
  top: 16px
  left: 16px
  display: grid
  grid-row-gap: 32px
  height: calc(100vh - 32px)
  overflow: scroll
#leftConfig
  left: 16px
#rightConfig
  right: 16px
h1, h2, h3, p
  font-size: 16px
  margin: 0
</style>
