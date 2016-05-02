<template>
<div class="bar-wrapper clearfix row" v-el:wrapper>
  <div id="icon-left" class="col s1">
    <img src="../assets/bl.png" class="responsive-img">
  </div>
  <div id="bar" class="col s10" v-show="height > 0" v-el:bar>
    <span id="bar-left" class="left center-align" :style="{width: width.left}">
      <i class="white-text" v-show="showText" transition="fade-in">{{mock.horde}}</i>
    </span>
    <span id="bar-right" class="right center-align" :style="{width: width.right}">
      <i class="white-text" v-show="showText" transition="fade-in">{{mock.alliance}}</i>
    </span>
  </div>
  <div id="icon-right" class="col s1 right">
    <img src="../assets/lm.png" class="responsive-img">
  </div>
  <canvas id="canvas" v-el:canvas></canvas>
</div>
</template>

<script lang="babel">
import LightLoader from 'lightLoader'

export default {
  data () {
    return {
      mock: {
        horde: 252,
        alliance: 210
      },
      width: {
        left: 0,
        right: 0
      },
      showText: false,
      loaded: false
    }
  },
  computed: {
    per () {
      const total = this.mock.horde + this.mock.alliance
      const leftPer = Math.ceil(100 * this.mock.horde / total)
      const rightPer = Math.floor(100 * this.mock.alliance / total)
      return {
        leftPer: leftPer,
        rightPer: rightPer
      }
    }
  },
  props: {
    height: {
      type: Number,
      default: 0
    },
    trigger: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    dwidth () {
      setTimeout(() => {
        this.width.left = this.per.leftPer - 0.1 + '%'
        this.width.right = this.per.rightPer - 0.1 + '%'
        setTimeout(() => {
          const c = document.getElementById('canvas')
          const cl = new LightLoader(c, c.width, c.height)
          cl.init()
          this.showText = true
        }, 1500)
      }, 0)
    },
    fire () {
      if (this.loaded && this.trigger) {
        this.height = this.$els.wrapper.offsetHeight
        this.$els.bar.style.height = this.height / 3 + 'px'
        this.$els.bar.style.marginTop = this.height / 3 + 'px'
        this.$els.bar.style.lineHeight = this.height / 3 + 'px'
        this.$els.canvas.style.height = this.height * 2 / 3 + 'px'
        this.$els.canvas.style.left = (this.per.leftPer * 5 / 6 + 100 / 12) + '%'
        this.$els.canvas.style.top = this.height * 1 / 6 + 'px'
        this.dwidth()
        this.trigger = false
        this.loaded = false
      }
    }
  },
  ready () {
    const img = document.getElementsByTagName('img')
    // check whether the last img loaded
    img[2].onload = () => { this.loaded = true }
    this.$watch('trigger', (val) => {
      this.fire()
    })
    this.$watch('loaded', (val) => {
      this.fire()
    })
  }
}
</script>

<style scoped="true">
  .bar-wrapper {
    position: relative;
    margin-top: 1rem;
    width: 100%;
  }
  .bar-wrapper > div {
    display: inline-block;
  }
  #icon-left, #icon-right {
    height: auto;
    background-size: contain;
  }
  #bar {
    padding: 0;
    opacity: 0.6;
  }
  #bar > span {
    display: inline-block;
    height: 100%;
  }
  #bar-left {
    background: #B30000;
    border-radius: 5px 0 0 5px;
  }
  #bar-right {
    background: #247FAA;
    border-radius: 0 5px 5px 0;
  }
  img {
    width: 100%;
  }
  #canvas {
    position: absolute;
    margin-left: -2rem;
    width: 4rem;
  }
  .container .row {
    margin-left: 0;
    margin-right: 0;
  }
  @media screen and (max-width: 992px) {
    .bar-wrapper {
      margin-top: 2rem;
    }
  }
</style>