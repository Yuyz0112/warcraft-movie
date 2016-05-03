<template>
<div id="main-wrapper">
  <div class="container row">
    <div class="col s12 l6" v-for="card of cards">
      <a v-link="card.url">
        <card class="small hoverable">
          <div slot="content">
            <h4>{{ card.message }}</h4>
            <img :src="card.img">
          </div>
        </card>
      </a>
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
      cards: [
        {message: '《魔兽》要闻', url: '/customer/news', img: '/static/o.png'},
        {message: '找寻战友', url: '../customer/partner', img: '/static/o.png'},
        {message: '我的《魔兽》', url: '../customer/life', img: '/static/o.png'},
        {message: '附近的人', url: '../customer/nearby', img: '/static/o.png'}
      ],
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
    padding-top: 10rem;
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

  .small {
    text-align: center;
  }
</style>