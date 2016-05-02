<template>
<div id="main-wrapper">
  <div class='panel row'>
    <div class='grid col s3 white-text' v-for="item of query" transition="item">
      <p>{{item.nickname}}</p>
      <div class="avator">
        <img :src="item.avator" class="responsive-img">
      </div>
      <p>距离：<span class="teal-text">{{item.distance}}</span>米</p>
    </div>
  </div>
</div>
</template>

<script lang='babel'>
import vInput from './Input'
import vButton from './Button'
import Wilddog from 'Wilddog'

export default {
  components: {
    vInput,
    vButton
  },
  data () {
    return {
      radius: 6378137.0,
      pi: Math.PI,
      authData: {},
      query: []
    }
  },
  methods: {
    getDistance (location1, location2) {
      const a = this.getRad(location1[1]) - this.getRad(location2[1])
      const b = this.getRad(location1[0]) - this.getRad(location2[0])
      let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(this.getRad(location1[1])) * Math.cos(this.getRad(location2[1])) * Math.pow(Math.sin(b / 2), 2)))
      s = s * this.radius
      return Math.floor(s)
    },
    getRad (d) {
      return d * this.pi / 180.0
    },
    unauth () {
      const ref = new Wilddog('https://justwow.wilddogio.com/')
      ref.unauth()
      this.$dispatch('signIn', false)
      this.$route.router.go('/')
    },
    sort (obj) {
      let array = []
      for (let key in obj) {
        array.push(obj[key])
      }
      array = array.map((item) => {
        item.distance = this.getDistance(this.authData.geo.location, item.geo.location)
        return item
      })
      array.sort((a, b) => {
        return a.distance - b.distance
      })
      this.query = array
    },
    findNear () {
      const ref = new Wilddog('https://justwow.wilddogio.com/')
      ref.on('value', (snapshot) => {
        let near = snapshot.val()
        this.sort(near)
      })
    }
  },
  ready () {
    const ref = new Wilddog('https://justwow.wilddogio.com/')
    const authData = ref.getAuth()
    if (authData) {
      const personRef = new Wilddog('https://justwow.wilddogio.com/' + authData.uid)
      personRef.once('value', (snapshot) => { this.authData = snapshot.val() })
    } else {
      this.$route.router.go('/regist')
    }
    this.findNear()
  }
}
</script>

<style scoped='true'>
  html, body {
    width: 100%;
    height: 100%;
  }
  #main-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
  }
	.panel {
		width: 900px;
	}
	.grid {
		height: 230px;
    background: rgba(0, 0, 0, 0.7);
    margin: 0 5px 5px 0;
	}
  .avator {
    width: 100px;
    height: 100px;
  }
  .teal-text {
    font-weight: bold;
  }
</style>