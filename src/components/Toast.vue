<template>
<div v-show="show" id="toast-container" transition="fade-out">
  <div class="toast">{{message}}</div>
</div>
</template>

<script lang="babel">
export default {
  data () {
  },
  props: {
    message: '',
    show: false
  },
  methods: {
  },
  ready () {
    this.$watch('show', (val) => {
      if (val === true) {
        setTimeout(() => {
          this.show = false
        }, 3000)
        setTimeout(() => {
          this.message = ''
        }, 3500)
      }
    })
  }
}
</script>