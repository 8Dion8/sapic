<template lang="pug">
  .wrapper
    section.body__wrapper
      MenuWindow
      .preview__window
        .zoom_out(
          :style="{\
            transform: `scale(${scalePercent})`,\
            width: `calc(100% / ${scalePercent}) !important`,\
            height: `calc(100% * ${scalePercent}) !important`,\
          }"
        )
          Preview(v-if="$store.state.format !== 'webm'")
          PreviewWebm(v-else)

          BgPreloader
      RightMenu
      Inventory
      Scripts
      div(id="nn_lb2")
</template>

<script>
import TWEEN from '@tweenjs/tween.js'

import Preview from './Preview'
import PreviewWebm from './PreviewWebm'
import Inventory from './Inventory'
import TitleBar from './TitleBar'
import MenuWindow from './MenuWindow'
import BgPreloader from './BgPrealoader'
import Scripts from '../../Scripts'
import RightMenu from './RightMenu'

export default {
  components: {
    Scripts,

    Preview,
    TitleBar,
    MenuWindow,
    Inventory,
    PreviewWebm,
    BgPreloader,
    RightMenu,
  },
  data () {
    return {
      animatedScale: this.$store.state.previewScale,
    }
  },
  computed: {
    scalePercent () {
      return this.animatedScale / 100
    },
    previewScale () {
      return this.$store.state.previewScale
    },
  },
  watch: {
    previewScale: function (newValue) {
      console.log('new preview scale', newValue)
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      const that = this

      new TWEEN.Tween({ tweeningValue: this.animatedScale })
        .to({ tweeningValue: this.previewScale }, 375)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function (o, n, q) {
          that.animatedScale = o.tweeningValue
        })
        .start()

      animate()
    },
  },
}
</script>

<style scoped lang="stylus">
@import '../../../assets/css/color'

.body__wrapper
  height 100%
  display flex
  flex-direction row
  background-color $color-main

.preview__window
  height 100%
  flex 1 1 auto
  overflow-x hidden
  border-radius 20px
  background $color-black

  &::-webkit-scrollbar
    width 0
    height 0

.wrapper
  display flex
  flex-direction column

.hidden
  display none

.zoom_out
  margin 0
  transform-origin 0 0
</style>

<style>
button,
a {
  -webkit-app-region: no-drag;
}

html,
body {
  height: 100%;
}

body {
  margin: 0;
  font-family: "open sans";
  overflow: hidden;
}

#app {
  height: 100%;
}

.layout_wrapper,
.wrapper {
  height: 100%;
}

::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #666666;
  transition: background-color 0.25s ease;
  border-radius: 20px;
}
::-webkit-scrollbar-thumb:hover {
  transition: background-color 0.25s ease;
  background-color: #8c8c8c;
}
::-webkit-scrollbar-thumb:active {
  background: #333333;
}
::-webkit-scrollbar-track {
  background: #12151a;
  border-radius: 0 20px 0 0;
}
::-webkit-scrollbar-track:hover {
  background: #1c2129;
}
::-webkit-scrollbar-track:active {
  background: #272d38;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
<style scoped src="@/assets/fonts/opensans.css"></style>
