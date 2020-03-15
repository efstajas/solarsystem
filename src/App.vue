<template lang="pug">
  div#app
    SolarSystem()
    #config
      #leftConfig
        DestinationConfigurator
      #rightConfig
        PlanetConfigurator
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Planet from '@/components/Planet/Planet.vue';
import SolarSystem from '@/components/SolarSystem.vue';
import DestinationConfigurator from '@/components/DestinationConfigurator';
import PlanetConfigurator from '@/components/PlanetConfigurator';
import { getModule } from 'vuex-module-decorators';
import outputModule from '@/store/modules/output/output.module';

@Component({
  components: {
    Planet,
    SolarSystem,
    PlanetConfigurator,
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
#config
  display: grid
  position: fixed
  top: 16px
  left: 16px
  right: 16px
  grid-template-columns: minmax(100px, 300px) auto minmax(100px, 300px)
  grid-template-areas: "left . right"
  height: calc(100vh - 32px)
#leftConfig
  grid-area: left
#rightConfig
  grid-area: right
  overflow: auto
  &::-webkit-scrollbar
    display: none
h1, h2, h3, p
  font-size: 16px
  margin: 0
</style>
