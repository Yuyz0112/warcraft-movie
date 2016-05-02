<template>
  <navbar></navbar>
  <router-view></router-view>
</template>

<script lang="babel">
import navbar from './components/Nav'
import Wilddog from 'Wilddog'

export default {
  components: {
    navbar
  },
  methods: {
    broadcast (val) {
      this.$broadcast('signIn', val)
    }
  },
  events: {
    signIn: 'broadcast'
  },
  ready () {
    const ref = new Wilddog('https://justwow.wilddogio.com/')
    const authData = ref.getAuth()
    this.broadcast(authData)
  }
}
</script>

<style lang="scss">
@import "./assets/sass/normalize";
@import "./assets/sass/color";
@import "./assets/sass/variables";
@import "./assets/sass/global";
@import "./assets/sass/grid";
@import "./assets/sass/typography";
@import "./assets/sass/nav";
@import "./assets/sass/card";
@import "./assets/sass/input";
@import "./assets/sass/select";
@import "./assets/sass/switch";
@import "./assets/sass/toast";
@import "./assets/sass/button";
@import "./assets/sass/tab";
@import "./assets/sass/chip";
@import "./assets/sass/collection";
@import "./assets/sass/preloader";

@import "./assets/sass/animate";

html {
  height: 100%;
}

body {
  height: 100%;
  background: url('./assets/bg.jpg') 50% 50% no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>