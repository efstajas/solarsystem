<template lang="pug">
  div
    Window#DestinationConfigurator(
      title="Destination"
    )
      select(v-model="selectedOutputMode")#dropdown
        option(v-for="option in outputModes" :value="option") {{ option }}
      p ready: {{ ready }}
    Window#MidiSettings(title="Destination Settings" v-if="configuratorConfig")
      #dropdowns
        .dropdown(v-for="dropdown in configuratorConfig.filter(c => c.type === 'DROPDOWN')")
          span.label {{ dropdown.title }}:
          select(
            @change="handleInputSelect"
            :id="dropdown.id"
          )
            option(
              v-for="option in dropdown.options"
              :value="option.id"
              :selected="option.default"
            ) {{ option.label }}
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import Window from '@/components/Window';

import { getModule } from 'vuex-module-decorators';
import outputModule from '@/store/modules/output/output.module';
import { OutputMode } from '../../store/modules/output/output.types';
import { OptionsType } from '../../store/modules/destinations/destination.types';

@Component({
  components: {
    Window,
  },
})
export default class DestinationConfigurator extends Vue {
  outputModule = getModule(outputModule, this.$store);

  selectedOutputMode = 'none';

  get outputModes() {
    return [
      'none',
      ...this.outputModule.availbleOutputModes,
    ];
  }

  get configuratorConfig() {
    return this.outputModule.configOptions;
  }

  get ready() {
    return this.outputModule.isInitalized;
  }

  handleInputSelect(e: Event) {
    if (
      this.outputModule.currentOutput
      && this.outputModule.currentOutput.configure
      && e.target
    ) {
      const target = e.target as HTMLSelectElement;

      this.outputModule.currentOutput.configure([{
        id: target.id,
        value: target.value,
        type: OptionsType.DROPDOWN,
      }]);
    }
  }

  @Watch('selectedOutputMode')
  onOutputModeChanged(now: string) {
    if (now === 'none') this.outputModule.shutdown();
    this.outputModule.initializeOutput(now as OutputMode);
  }
}
</script>

<style scoped lang="sass" src="./DestinationConfigurator.sass">
