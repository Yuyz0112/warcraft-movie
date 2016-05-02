<template>
  <div id="main-wrapper" @click="closeClick">
    <div class="container row">
      <tab :transform.sync="isMobile" class="center-block col s12 l6" :style="movement" id="tabs">
        <tabpanel>
          <card class="z-depth-2 col s12">
            <div slot="content" class="card-content" id="sign-in">
              <div class="center-align"><img src="../assets/o.png"></div>
              <v-input data-type="email" :message.sync="email">用户名（邮箱）</v-input>
              <v-input data-type="password" :message.sync="password" @keyup.enter="signIn">密码</v-input>
            </div>
            <div slot="action" class="card-action">
              <p class="center-align">
                <v-button class="btn-large" @click="signIn">登陆</v-button>
                <v-button class="btn-large" @click="forget">找回密码</v-button>
              </p>
            </div>
          </card>
        </tabpanel>
        <tabpanel>
          <card class="z-depth-2 col s12">
            <div slot="content" class="card-content" id="sign-up">
              <v-input data-type="email" :message.sync="userInfo.email">用户名（邮箱）</v-input>
              <v-input data-type="password" :message.sync="userInfo.password">密码</v-input>
              <uploader :key.sync="userInfo.avator" :loading.sync="uploading" :error.sync="toastMessage">上传头像</uploader>
              <v-input :message.sync="userInfo.nickname">昵称</v-input>
              <v-input :message.sync="userInfo.server">服务器</v-input>
              <v-input :message.sync="userInfo.guild">公会</v-input>
              <v-select :message.sync="userInfo.class" :show.sync="selectShow"></v-select>
              <v-switch id="faction-switch" :checked.sync="userInfo.faction">
                <span slot="label">阵营</span>
                <span slot="left">部落</span>
                <span slot="right">联盟</span>
              </v-switch>
              <p>&nbsp;</p>
              <v-switch :checked.sync="userInfo.sex">
                <span slot="label">性别</span>
                <span slot="left">男</span>
                <span slot="right">女</span>
              </v-switch>
              <p>&nbsp;</p>
              <b-input :message.sync="userInfo.geo.address" :show.sync="showMap">
                <span slot="label">坐标</span>
                <span slot="button" v-el:search style="width:100%;height:100%;display:inline-block">搜索</span> 
              </b-input>
              <v-input :message.sync="userInfo.contact">联系方式</v-input>
            </div>
            <div slot="action" class="card-action">
              <p class="center-align">
                <v-button class="btn-large" @click="signUp">提交注册</v-button>
              </p>
            </div>
          </card>
        </tabpanel>
      </tab>
      <div class="col s4" id="user-card" v-show="isMobile" transition="slide-from-right">
        <card class="z-depth-2 medium">
          <div slot="content" class="card-content">
            <div id="user-info" class="row">
              <div class="col s6" id="avator">
                <preloader class="preloader" v-if="uploading"></preloader>
                <img :src="userInfo.avator ? userInfo.avator : '/static/o.png'" class="circle" v-show="!uploading">
              </div>
              <div class="col s6">
                <p>{{userInfo.nickname ? userInfo.nickname : '昵称'}}</p>
                <p>@ {{userInfo.server ? userInfo.server : '服务器'}}</p>
                <p>{{userInfo.guild ? userInfo.guild : '公会名称'}}</p>
                <p :style="{color:userInfo.class.color}">{{userInfo.class.content}}</p>
              </div>
            </div>
            <img v-show="userInfo.faction" src="../assets/alliance.png" id="faction" transition="fade-in">
            <img v-show="!userInfo.faction" src="../assets/horde.png" id="faction" transition="fade-in">
            <div class="chip">坐标：{{userInfo.geo.city}}</div>
            <div class="chip">性别：{{userInfo.sex ? '女' : '男'}}</div>
          </div>
          <div slot="action" class="card-action">
            <p>联系方式将只展现给您的好友</p>
            <p v-if="!userInfo.contact">例：微信号：abc123</p>
            <p>{{userInfo.contact}}</p>
          </div>
        </card>
        <div id="map" v-show="showMap" transition="fade-in">
          <v-button id="close-map" class="red" @click="showMap = false">X</v-button>
          <collection id="geo-panel" :items.sync="pois" :select.sync="userInfo.geo" :show.sync="showMap"></collection>
        </div>
      </div>
    </div>
  </div>
  <toast :message.sync="toastMessage" :show.sync="showToast"></toast>
</template>

<script lang="babel">
import card from './Card'
import tab from './Tab'
import tabpanel from './TabPanel'
import vInput from './Input'
import uploader from './Uploader'
import bInput from './BtnInput'
import vSelect from './Select'
import vSwitch from './Switch'
import vButton from './Button'
import toast from './Toast'
import collection from './Collection'
import preloader from './Preloader'

import AMap from 'AMap'
import Wilddog from 'Wilddog'

export default {
  components: {
    tab,
    tabpanel,
    card,
    vInput,
    bInput,
    vSelect,
    vSwitch,
    vButton,
    toast,
    collection,
    uploader,
    preloader
  },
  data () {
    return {
      toastMessage: '',
      showToast: false,
      email: '',
      password: '',
      isMobile: false,
      uploading: false,
      userInfo: {
        email: '',
        password: '',
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
      selectShow: false,
      showMap: false,
      pois: [{name: '输入关键字后点击搜索查询'}]
    }
  },
  computed: {
    movement () {
      if (this.isMobile) {
        const containerWidth = document.querySelector('.container').offsetWidth
        const tabsWidth = document.getElementById('tabs').offsetWidth
        const d = (containerWidth - tabsWidth) / 2
        return {
          transform: `translateX(-${d}px)`
        }
      } else {
        return {
          transform: 'translateX(0px)'
        }
      }
    }
  },
  methods: {
    signIn () {
      const form = document.querySelector('#sign-in input.invalid')
      if (form === null) {
        const ref = new Wilddog('https://justwow.wilddogio.com/')
        const auth = (error, authData) => {
          if (error) {
            this.toastMessage = '登录失败，请输入正确的用户名及密码。'
          } else {
            this.$dispatch('signIn', authData)
            this.$route.router.go('/customer')
          }
        }
        ref.authWithPassword({
          email: this.email,
          password: this.password
        }, auth)
      } else {
        this.toastMessage = '请输入正确的用户名'
      }
    },
    forget () {
      this.toastMessage = 'Oh no ...'
    },
    closeClick () {
      if (this.selectShow) {
        this.selectShow = false
      }
    },
    signUp () {
      let valid = true
      for (let key in this.userInfo) {
        if (this.userInfo[key] === '') {
          if (this.userInfo.avator === '') {
            this.toastMessage = '别忘了上传头像哦'
          } else {
            this.toastMessage = '请完善您的注册信息，帮助您更好的找到小伙伴'
          }
          valid = false
          return false
        }
      }
      const form = document.querySelector('#sign-up input.invalid')
      if (form !== null) {
        this.toastMessage = '请输入正确的邮箱格式'
        valid = false
      }
      if (valid) {
        const ref = new Wilddog('https://justwow.wilddogio.com/')
        ref.createUser({
          email: this.userInfo.email,
          password: this.userInfo.password
        }, (error, data) => {
          if (error !== null) {
            this.toastMessage = error.toString()
          } else {
            const auth = (error) => {
              if (error) {
                this.toastMessage = error.toString()
              } else {
                this.userInfo.password = '*'
                ref.child(data.uid).set(this.userInfo)
                this.$dispatch('signIn', data)
                this.$route.router.go('/customer')
              }
            }
            ref.authWithPassword({
              email: this.userInfo.email,
              password: this.userInfo.password
            }, auth)
          }
        })
      }
    }
  },
  ready () {
    this.$watch('toastMessage', (val) => {
      if (val !== '') {
        this.showToast = true
      }
    })

    const map = new AMap.Map('map', {
      zoom: 15,
      center: [116.39, 39.9]
    })

    AMap.service('AMap.PlaceSearch', () => {
      const placeSearch = new AMap.PlaceSearch({
        pageSize: 5,
        pageIndex: 1,
        count: 5,
        map: map
      })
      const searchGeo = () => {
        placeSearch.search(this.userInfo.geo.address, (status, result) => {
          if (result.info === 'OK') {
            this.pois = result.poiList.pois
          } else {
            this.toastMessage = '请输入更详细的位置名称，例如X市Y路'
          }
        })
      }
      this.$els.search.onclick = () => { searchGeo() }
    })
  }
}
</script>

<style scoped="true">
  #main-wrapper{
    padding-top: 5rem;
  }

  .container{
    position:relative;
  }

  #tabs{
    transition : all .5s ease;
  }

  #sign-in img {
    max-height: 120px;
    height: 8rem;
  }

  #user-card{
    position:fixed;
    top:5rem;
    padding-top: 56px;
  }

  #user-card > .card{
    margin-top: 0;
  }

  #user-card .card-content{
    position:relative;
    line-height: 3;
    height: 70%;
  }

  #avator{
    width: 143px; 
    height: 120px;
    margin-right: 2rem;
    margin-top: 26px;
  }

  #avator > img {
    width: 100%;
    height: 100%;
    display: block;
  }

  #user-info p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #faction{
    width: 80px;
    height: auto;
    position: absolute;
    right: 0rem;
    bottom: 0;
  }

  #user-card .chip{
    margin-top: 2rem;
  }

  #map {
    width: 100%;
    padding: 0 .75rem;
    height:450px;
    position:absolute;
    top: 56px;
    z-index: 999;
  }

  #geo-panel {
    position: absolute;
    left: 0;
    bottom:0;
    z-index: 1000;
  }

  .preloader {
    margin-left: 40px;
    margin-top: 30px;
  }

  #close-map {
    display: inline-block;
    position: absolute;
    width: 48px;
    height: 48px;
    line-height: 48px;
    right: 0;
    top: 0;
    z-index: 1000;
    border-radius: 50%;
    padding: 0;
  }
</style>