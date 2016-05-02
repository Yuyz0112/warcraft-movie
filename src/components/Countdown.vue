<template>
<p class="white-text center-align">
  <span v-for="value in count" :id="$key">
    {{value}}
    <i class="yellow-text">{{$key}}</i>
  </span>
</p>
</template>

<script lang="babel">
export default {
  data () {
    return {
      count: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      finalDate: new Date('2016-06-10').getTime()
    }
  },
  props: {
    height: {
      type: Number,
      default: 0
    }
  },
  methods: {
    leftPad (num) {
      if (num < 10 && num >= 0) {
        return '0' + num
      } else {
        return num
      }
    },
    countDown () {
      const now = new Date().getTime()
      let time = (this.finalDate - now) / 1000
      this.count.days = this.leftPad(Math.floor(time / 86400))
      time = time % 86400
      this.count.hours = this.leftPad(Math.floor(time / 3600))
      time = time % 3600
      this.count.minutes = this.leftPad(Math.floor(time / 60))
      time = time % 60
      this.count.seconds = this.leftPad(Math.floor(time))
    }
  },
  ready () {
    this.height = this.$el.offsetHeight
    this.countDown()
    setInterval(() => {
      this.countDown()
    }, 1000)
  }
}
</script>

<style scoped="true">
  p {
    font-size: 4rem;
    margin: 0;
  }
  span {
    border-bottom: 4px solid #fcd778;
    margin: 0 1rem;
    position: relative;
    display: inline-block;
    width: 4.5rem;
    line-height: 1;
  }
  span i {
    font-style: normal;
    position: absolute;
    left: 0;
    top: 4.5rem;
    font-size: 1rem;
    display: inline-block;
    width:4.5rem;
  }
</style>