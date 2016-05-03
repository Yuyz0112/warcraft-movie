<template>
<nav>
  <div class="nav-wrapper">
    <a v-link="'/'" class="brand-logo"><img src="../assets/forever.png"></a>
    <a @click="show = show * -1" class="button-collapse"><img src="../assets/menu.png"></a>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li v-for="list of lists">
        <a v-link="list.url" @click="navClick($index)" v-if="list.message !== ''">{{ list.message }}</a>
      </li>
    </ul>
    <ul v-show="show === 1" class="side-nav" id="mobile-list" transition="expand">
      <li v-for="list of lists">
        <a v-link="list.url" @click="navClick($index)" v-if="list.message !== ''">{{ list.message }}</a>
      </li>
    </ul>
  </div>
</nav>
</template>

<script lang="babel">
import Wilddog from 'Wilddog'

export default {
  data () {
    return {
      lists: [
        {message: '首页', url: '/'},
        {message: '登录/注册', url: '/regist'},
        {message: '', url: '/'}
      ],
      show: -1
    }
  },
  methods: {
    unauth () {
      const ref = new Wilddog('https://justwow.wilddogio.com/')
      ref.unauth()
      this.$dispatch('signIn', false)
    },
    navClick (i) {
      this.show = -1
      if (i === 2) {
        this.unauth()
      }
    }
  },
  ready () {
    this.$on('signIn', (val) => {
      if (val !== undefined && val) {
        this.lists[1].message = '个人中心'
        this.lists[1].url = '/customer'
        this.lists[2].message = '退出登录'
      } else {
        this.lists[1].message = '登录/注册'
        this.lists[1].url = '/regist'
        this.lists[2].message = ''
      }
    })
  }
}
</script>

<style scoped="true">
  .brand-logo {
    height: 100%;
  }
  .brand-logo img{
    width: auto;
    height: 100%;
  }
</style>