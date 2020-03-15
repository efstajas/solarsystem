import Tone from 'tone';

import Destination, { Note } from './destination.types';

export default class TonejsDestination implements Destination {
  reverb = new Tone.Reverb(50);

  synth = new Tone.PolySynth(8, Tone.Synth, {
  }).chain(
    new Tone.Gain(0.1),
    this.reverb,
    Tone.Master,
  )

  public initialized = false;

  constructor() {
    this.reverb.generate();
    this.initialized = true;
  }

  // eslint-disable-next-line class-methods-use-this
  public playNote(note: Note): void {
    this.synth.triggerAttackRelease(note, '8n');
  }
}
