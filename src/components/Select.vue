<template>
<div class="input-field">
  <div class="select-wrapper icons">
    <span class="caret">▼</span>
    <input type="text" class="select-dropdown" readonly="true" v-model="message.content" @click.stop="active" :style="{color:message.color}">
    <ul class="dropdown-content select-dropdown" v-show="show" transition="fade-in">
      <li class="disabled">
        <span>选择你的职业</span>
      </li>
      <li v-for="class of classes" @click.stop="selectClass($index)">
        <img :src="class.url" class="left circle">
        <span :style="{color:class.color}">{{class.name}}</span>
      </li>
    </ul>
  </div>
  <label class="select-label">职业</label>
</div>
</template>

<script lang="babel">
export default {
  data () {
    return {
      classes: [
        {
          name: '战士',
          url: 'http://wow.tgbus.com/style2015/images/ZS_xiaoyuan.png',
          color: '#c69b6d'
        }, {
          name: '圣骑士',
          url: 'http://wow.tgbus.com/style2015/images/QS_xiaoyuan.png',
          color: '#f48cba'
        }, {
          name: '盗贼',
          url: 'http://wow.tgbus.com/style2015/images/DZ_xiaoyuan.png',
          color: '#fff468'
        }, {
          name: '萨满祭祀',
          url: 'http://wow.tgbus.com/style2015/images/SM_xiaoyuan.png',
          color: '#2359ff'
        }, {
          name: '猎人',
          url: 'http://wow.tgbus.com/style2015/images/LR_xiaoyuan.png',
          color: '#aad372'
        }, {
          name: '牧师',
          url: 'http://wow.tgbus.com/style2015/images/MS_xiaoyuan.png',
          color: '#f0ebe0'
        }, {
          name: '死亡骑士',
          url: 'http://wow.tgbus.com/style2015/images/DK_xiaoyuan.png',
          color: '#c41e3b'
        }, {
          name: '法师',
          url: 'http://wow.tgbus.com/style2015/images/FS_xiaoyuan.png',
          color: '#68ccef'
        }, {
          name: '术士',
          url: 'http://wow.tgbus.com/style2015/images/SS_xiaoyuan.png',
          color: '#9382c9'
        }, {
          name: '武僧',
          url: 'http://wow.tgbus.com/style2015/images/WS_xiaoyuan.png',
          color: '#00ffba'
        }, {
          name: '德鲁伊',
          url: 'http://wow.tgbus.com/style2015/images/XD_xiaoyuan.png',
          color: '#ff7c0a'
        }
      ]
    }
  },
  props: {
    message: {
      type: Object,
      default: function () {
        return {
          content: '选择你的职业',
          color: '#fff'
        }
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    active () {
      this.show = true
    },
    selectClass (index) {
      this.message.content = this.classes[index].name
      this.message.color = this.classes[index].color
      this.show = false
    }
  }
}
</script>