<template>
<div v-show="show">
  <slot></slot>
</div>
</template>

<script lang="babel">
export default {
  data () {
    return {
      index: 0
    }
  },
  computed: {
    show () {
      return (this.$parent.active === this.index)
    }
  },
  methods: {
    tabChange (index) {
      const tabWidth = 100 / this.tabs.length
      this.position = (index * tabWidth) + '%'
    }
  },
  ready () {
    for (let c in this.$parent.$children) {
      if (this.$parent.$children[c].$el === this.$el) {
        this.index = parseInt(c)
        break
      }
    }
  }
}
</script>