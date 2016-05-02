<template>
<div class="collection">
  <a class="collection-item" v-for="item of items" :class="active === $index ? 'active' : 'not' " @click="click($index)">{{$index + 1}}.{{item.name}}</a>
</div>
</template>

<script lang="babel">
export default {
  data () {
    return {
      active: 1
    }
  },
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    select: {
      type: Object,
      default: () => {
        return {
          address: '',
          location: [],
          city: '城市名'
        }
      }
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    click (index) {
      this.active = index
      this.select.address = this.items[index].name
      this.select.location[0] = this.items[index].location.lng
      this.select.location[1] = this.items[index].location.lat
      this.select.city = this.items[index].cityname
      this.show = false
    }
  }
}
</script>

<style scoped="true">
  .collection {
    width:100%;
  }
</style>