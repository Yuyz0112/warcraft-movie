<template>
<a class="btn-block btn">
  <slot></slot>
</a>
</template>

<script lang="babel">
import plupload from 'plupload'
import Qiniu from 'Qiniu'
export default {
  props: {
    key: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  methods: {
    upload (self) {
      window.fetch('http://qiniu.myriptide.com/uptoken/')
        .then(response => response.json())
        .then((data) => {
          const uploader = Qiniu.uploader({
            runtimes: 'html5',
            browse_button: this.$el,
            max_file_size: '4mb',
            domain: 'http://7xs8rx.com1.z0.glb.clouddn.com/',
            uptoken: data.uptoken,
            get_new_uptoken: false,
            auto_start: true,
            unique_names: true,
            init: {
              'BeforeUpload': (up, file) => {
                self.loading = true
              },
              'FileUploaded': (up, file, info) => {
                info = JSON.parse(info)
                self.loading = false
                self.key = 'http://7xs8rx.com1.z0.glb.clouddn.com/' + info.key
              },
              'Error': (up, err, errTip) => {
                if (err.code === -600) {
                  self.error = '请勿上传超过4MB大小的图片'
                } else {
                  self.error = errTip
                }
              }
            }
          })
          console.log(plupload, uploader)
        })
        .catch(e => console.log(e))
    }
  },
  ready () {
    this.upload(this)
  }
}
</script>