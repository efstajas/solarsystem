<template lang="pug">
  div
    #window
      h1#title {{ title }}
      #content
        slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Window extends Vue {
  @Prop({ default: 'title' }) private title!: string;
}
</script>

<style scoped lang="sass" src="./Window.sass">
