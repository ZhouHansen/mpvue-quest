<template>
  <div class="nav-container">
    <div class="nav-list">
      <div class="weui-navbar">
        <scroll-view :scroll-x="'true'" :scroll-with-animation="'true'" :scroll-left="scrollLeft">
          <div class="weui-navbar__slider" :style="'transform:translateX(' + navbarTranslate + 'vw);'"></div>
          <block v-for="(item, index) in tabs" :key="index">
            <div :id="index"
              :style="'width: ' + navVarItemWidth + 'vw;'"
              :class="{'weui-bar__item_on':activeIndex == index}"
              class="weui-navbar__item" @click="tapNavClick">
              <div class="weui-navbar__title">{{item}}</div>
            </div>
          </block>
        </scroll-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['tabs', 'checkIndex', 'unOnShowDefault'],
  data () {
    return {
      // tabs: ['选项一', '选项二', '选项三', '选项四'],
      activeIndex: 0
    };
  },
  onShow () {
    if (!this.unOnShowDefault) {
      this.activeIndex = 0;
    }
  },
  mounted () {
    if (this.checkIndex) {
      this.activeIndex = parseInt(this.checkIndex);
    }
  },
  computed: {
    scrollLeft () {
      if (this.activeIndex >= 3) {
        let system = this.$storage.get(this.$storageTypeName['system']);
        return this.navVarItemWidth * (this.activeIndex - 2) * (system.windowWidth / 100);
      } else {
        return 0;
      }
    },

    navVarItemWidth () {
      if (this.tabs.length > 5) {
        return 100 / 5;
      } else {
        return 100 / this.tabs.length;
      }
    },

    navbarLeft () {
      if (this.tabs.length > 5) {
        return ((100 / 5) - 10) / 2;
      } else {
        return ((100 / this.tabs.length) - 10) / 2;
      }
    },

    navbarTranslate () {
      return ((2 * this.activeIndex + 1) * this.navbarLeft) + (this.activeIndex * 10);
    }
  },
  methods: {
    tapNavClick (e) {
      this.activeIndex = e.currentTarget.id;
      this.$emit('tapNavItem', e.currentTarget.id);
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .nav-container {

    .weui-navbar {
      position: relative;
      border: 0;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;

      scroll-view {
        width: 100%;
        position: relative;
        height: 96rpx;
      }

      .weui-navbar__item {
        display: inline-block;
      }
    }

    .weui-navbar__slider {
      width: 10vw;
      top: 90rpx;
    }
  }
</style>
