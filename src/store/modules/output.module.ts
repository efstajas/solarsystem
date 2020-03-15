import {
  Module,
  VuexModule,
  Mutation,
  Action,
} from 'vuex-module-decorators';
import { OutputMode } from './output.types';

import TonejsDestination from './destinations/tonejs.destination';
import MidiDestination from './destinations/midi.destination';
import Destination from './destinations/destination.types';

@Module({
  name: 'outputs',
  namespaced: true,
})
export default class Outputs extends VuexModule {
  currentOutputMode: OutputMode = 'tonejs';

  currentOutput: Destination | null = null;

  get outputMode() {
    return this.currentOutputMode;
  }

  // eslint-disable-next-line class-methods-use-this
  get availbleOutputModes() {
    return [
      'midi',
      'tonejs',
    ] as OutputMode[];
  }

  get configOptions() {
    if (!this.currentOutput) return null;

    return this.currentOutput.options;
  }

  get isInitalized() {
    return Boolean(this.currentOutput && this.currentOutput?.initialized);
  }

  get output() {
    return this.currentOutput;
  }

  @Mutation
  setOutput(output: Destination) {
    this.currentOutput = output;
  }

  @Mutation
  clearOutput() {
    this.currentOutput = null;
  }

  @Action({ commit: 'setOutput' })
  // eslint-disable-next-line class-methods-use-this
  async initializeOutput(mode: OutputMode) {
    if (this.currentOutput && this.currentOutput.destroy) await this.currentOutput.destroy();

    switch (mode) {
      case 'midi':
        return new MidiDestination();
      case 'tonejs':
        return new TonejsDestination();
      default:
        throw new Error('Unknown output mode');
    }
  }

  @Action({ commit: 'clearOutput' })
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  shutdown() {}
}
