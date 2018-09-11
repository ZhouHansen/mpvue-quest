<template>
  <div class="nav-container">
    <div class="nav-list">
      <div class="weui-navbar">
        <block v-for="(item, index) in tabs" :key="index">
          <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tapNavClick">
            <div class="weui-navbar__title">{{item}}</div>
          </div>
        </block>
        <div class="weui-navbar__slider" :style="'transform:translateX(' + navbarTranslate + 'vw);'"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['tabs'],
  data () {
    return {
      // tabs: ['选项一', '选项二', '选项三', '选项四'],
      activeIndex: 0
    };
  },
  computed: {
    navbarLeft () {
      return ((100 / this.tabs.length) - 10) / 2;
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
    }

    .weui-navbar__slider {
      width: 10vw;
    }
  }
</style>
