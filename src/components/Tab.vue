<template>
<div class="row">
  <ul class="tabs">
    <li v-for="tab of tabs" class="tab col" :class="grid">
      <a @click="tabChange($index)">{{ tab.message }}</a>
    </li>
    <div class="indicator" :style="{transform: 'translateX(' + position + 'px)',width: (100 / tabs.length) + '%'}" transition="ease" ></div>
  </ul>
  <slot></slot>
</div>
</template>

<script lang="babel">
export default {
  data () {
    return {
      tabs: [
        {message: '登陆'},
        {message: '注册'}
      ],
      position: 0
    }
  },
  computed: {
    grid () {
      return 's' + (12 / this.tabs.length)
    },
    mobile () {
      if (document.body.clientWidth < 992) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    tabChange (index) {
      const tabWidth = document.querySelector('.tabs').offsetWidth
      this.active = index
      if (index === 1) {
        this.position = tabWidth / 2
        if (this.mobile === false) {
          this.transform = true
        }
      } else {
        this.position = 0
        this.transform = false
      }
    }
  },
  props: {
    active: {
      type: Number,
      default: 0
    },
    transform: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped="true">
  a {
    cursor: pointer;
  }
</style>