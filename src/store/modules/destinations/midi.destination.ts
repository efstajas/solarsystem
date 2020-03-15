import WebMidi, { Output } from 'webmidi';

import Destination, {
  Note,
  OptionsType,
  ConfigurationResult,
  ConfiguratorConfiguration,
} from './destination.types';

export default class TonejsDestination implements Destination {
  get initialized() {
    return Boolean(this.wm && this.output);
  }

  wm: typeof WebMidi | null = null;

  output: Output | null = null;

  constructor() {
    WebMidi.enable((err) => {
      if (err) {
        console.log('WebMidi could not be enabled.', err);
      } else {
        console.log(WebMidi.outputs);
        this.wm = WebMidi;
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  get options() {
    const list = this.wm?.outputs.map((o) => ({
      id: o.id,
      label: o.name,
      default: false,
    })) || [];

    list.push({ default: true, id: 'none', label: 'none' });

    return [
      {
        type: OptionsType.DROPDOWN,
        title: 'Output device',
        options: list,
        id: 'outputDevice',
      },
    ] as ConfiguratorConfiguration;
  }

  // eslint-disable-next-line class-methods-use-this
  public configure(payload: ConfigurationResult) {
    payload.forEach((optionFragment) => {
      switch (optionFragment.type) {
        case OptionsType.DROPDOWN:
          if (!this.wm) return;
          this.output = this.wm.getOutputById(optionFragment.value) || null;
          console.log(this.output);
          break;
        default:
          throw new Error('Unexpected option fragment');
      }
    });
  }

  public async destroy() {
    if (this.wm) this.wm.disable();
    console.log('wm destroyed');
  }

  // eslint-disable-next-line class-methods-use-this
  public playNote(note: Note): void {
    if (!this.output) return;

    this.output.playNote(note);
  }
}
