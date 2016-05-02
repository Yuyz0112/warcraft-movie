<template>
<div class="flex">
  <div id="main-wrapper">
    <div class="container z-depth-2" v-el:container>
      <countdown :height.sync="textHeight"></countdown>
      <vs-bar :height.sync="barHeight" :trigger.sync="init"></vs-bar>
      <geo-map :height="geoHeight"></geo-map>
    </div>
  </div>
</div>
</template>

<script lang="babel">
import card from './Card'
import vButton from './Button'
import countdown from './Countdown'
import vsBar from './VSbar'
import geoMap from './GeoMap'

export default {
  components: {
    card,
    vButton,
    countdown,
    vsBar,
    geoMap
  },
  data () {
    return {
      textHeight: 0,
      barHeight: 0,
      init: false
    }
  },
  computed: {
    geoHeight () {
      if (this.barHeight) {
        let geoHeight = this.$els.container.offsetHeight - this.textHeight - this.barHeight
        return geoHeight
      } else {
        return 0
      }
    }
  },
  route: {
    data: (transition) => {
      transition.next({
        init: true
      })
    }
  }
}
</script>

<style scoped="true">
  .flex {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  #main-wrapper {
    height: 80%;
    width: 100%;
  }
  .container {
    background: rgba(0, 0, 0, 0.7);
    height:100%;
    border-radius: 5px;
  }
</style>