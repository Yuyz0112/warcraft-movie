<template>
<div class="switch input-field">
  <label class="select-label">
    <slot name="label"></slot>
  </label>
  <label class="switch-label">
    <slot name="left"></slot>
    <input type="checkbox" v-model="checked">
    <span class="lever"></span>
    <slot name="right"></slot>
  </label>
</div>
</template>

<script lang="babel">
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>