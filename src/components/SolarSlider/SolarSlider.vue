<template lang="pug">
  #SolarSlider
    input(
      ref="slider"
      type="range"
      @input="update"
      min="0"
      max="800"
      :value="value"
    )#slider
    #orbitalTrack
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class SolarSlider extends Vue {
  sliderValue = 0;

  @Prop() readonly value!: string;

  update() {
    this.$emit('input', (this.$refs.slider as HTMLInputElement).value);
  }
}
</script>

<style lang="scss" scoped>
input[type=range]{
  -webkit-appearance: none;
  border: none;

  &::-webkit-slider-runnable-track {
    width: 250px;
    height: 2px;
    background: #CCC;
    border: none;
    border-radius: 1px;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: white;
    margin-top: -7px;
  }
  &:focus {
    outline: none;

    &::-webkit-slider-runnable-track {
      background: white;
    }
  }
}
</style>
