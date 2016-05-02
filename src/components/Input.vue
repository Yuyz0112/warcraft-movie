<template>
<div class="input-field">
  <input :type="type" :class="valid" @focus="focus" @blur="blur" v-model="message">
  <label :class="status">
    <slot></slot>
  </label>
</div>
</template>

<script lang="babel">
export default {
  data () {
    return {
      status: '',
      valid: '',
      type: 'text'
    }
  },
  props: {
    message: ''
  },
  methods: {
    focus () {
      this.status = 'active'
    },
    blur () {
      if (this.message === undefined || this.message === '') {
        this.status = ''
        this.valid = ''
      }
    }
  },
  ready () {
    this.type = this.$el.dataset.type
    this.$watch('message', (val) => {
      let reg = /\S/
      if (this.type === 'email') {
        reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      }
      if (reg.test(val)) {
        this.valid = 'valid'
      } else {
        this.valid = 'invalid'
      }
    })
  }
}
</script>