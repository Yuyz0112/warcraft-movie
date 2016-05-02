<template>
<nav>
  <div class="nav-wrapper">
    <a v-link="'/'" class="brand-logo"><img src="../assets/forever.png"></a>
    <a @click="show = show * -1" class="button-collapse"><img src="../assets/menu.png"></a>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li v-for="list of lists">
        <a v-link="list.url" @click="show = -1">{{ list.message }}</a>
      </li>
    </ul>
    <ul v-show="show === 1" class="side-nav" id="mobile-list" transition="expand">
      <li v-for="list of lists">
        <a v-link="list.url" @click="show = -1">{{ list.message }}</a>
      </li>
    </ul>
  </div>
</nav>
</template>

<script lang="babel">
export default {
  data () {
    return {
      lists: [
        {message: '首页', url: '/'},
        {message: '登录/注册', url: '/regist'}
      ],
      show: -1
    }
  },
  ready () {
    this.$on('signIn', (val) => {
      if (val !== undefined && val) {
        this.lists[1].message = '个人中心'
        this.lists[1].url = '/customer'
      } else {
        this.lists[1].message = '登录/注册'
        this.lists[1].url = '/regist'
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