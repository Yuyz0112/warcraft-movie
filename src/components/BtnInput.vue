<template>
<div class="input-field">
  <input :type="type" :class="valid" @focus="focus" @blur="blur" v-model="message">
  <a class="btn">
    <slot name="button"></slot>
  </a>
  <label :class="status">
    <slot name="label"></slot>
  </label>
</div>
</template>

<script lang="babel">
export default {
  data () {
    return {
      status: '',
      valid: '',
      type: 'text',
      hold: false
    }
  },
  props: {
    message: '',
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    focus () {
      this.status = 'active'
      this.show = true
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

<style scoped="true">
  input{
    width: 60%;
  }
  .btn{
    width: 30%;
    padding: 0 .5rem;
  }
</style>