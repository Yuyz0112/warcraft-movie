<template>
<div id="main-wrapper">
  <div class="container row">
    <div class="col s12">
      <card class="z-depth-2 small">
        <div slot="content" class="row">
          <div class="col s6 m4 l3">
            <div id="avator">
              <img :src="authData.avator" class="circle">
            </div>
          </div>
          <div class="col s6 m8 l9">
            <p>{{authData.nickname}}</p>
            <p>{{authData.guild}} @ {{authData.server}}</p>
            <p></p>
            <p :style="{color:authData.class.color}">{{authData.class.content}}</p>
            <img v-show="authData.faction" src="../assets/alliance.png" id="faction" transition="fade-in">
            <img v-show="!authData.faction" src="../assets/horde.png" id="faction" transition="fade-in">
            <div class="chip">坐标：{{authData.geo.city}}</div>
            <div class="chip">性别：{{authData.sex ? '女' : '男'}}</div>
          </div>
        </div>
      </card>
    </div>
    <div class="col s12 l6">
      <card class="z-depth-2 small">1</card>
    </div>
    <div class="col s12 l6">
      <card class="z-depth-2 small">1</card>
    </div>
    <div class="col s12 l6">
      <card class="z-depth-2 small">1</card>
    </div>
    <div class="col s12 l6">
      <card class="z-depth-2 small">1</card>
    </div>
  </div>

</div>
</template>

<script lang='babel'>
import card from './Card'
import vInput from './Input'
import vButton from './Button'
import Wilddog from 'Wilddog'

export default {
  components: {
    card,
    vInput,
    vButton
  },
  data () {
    return {
      authData: {
        avator: '',
        nickname: '',
        server: '',
        guild: '',
        class: {
          content: '职业',
          color: '#fff'
        },
        faction: false,
        sex: false,
        geo: {
          address: '',
          location: [],
          city: '城市名'
        },
        contact: ''
      },
      radius: 6378137.0,
      pi: Math.PI,
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
    // this.findNear()
  }
}
</script>

<style scoped='true'>
  #main-wrapper {
    padding-top: 5rem;
  }

  #avator{
    width: 140px;
    height: 140px;
    margin: 1rem auto;
  }

  #avator > img {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>