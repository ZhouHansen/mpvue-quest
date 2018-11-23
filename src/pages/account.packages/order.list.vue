<template>
  <div class="order-list-container">
    <hoo-nav :tabs="navData" @tapNavItem="chooseNav" :checkIndex="chooseNavNumber" :unOnShowDefault="true"></hoo-nav>
    <course-calendar-page v-if="chooseNavNumber === '0'"></course-calendar-page>
    <puchase-goods-page v-if="chooseNavNumber === '1'"></puchase-goods-page>
  </div>
</template>
<script>
import hooNav from '@/components/nav';
import CourseCalendarPage from '@/pages/account.packages/course.calendar';
import PuchaseGoodsPage from '@/pages/account.packages/purchase.goods';

export default {
  components: {
    hooNav,
    PuchaseGoodsPage,
    CourseCalendarPage
  },
  data () {
    return {
      navData: ['课程日历', '购买书籍'],
      chooseNavNumber: '0'
    };
  },
  mounted () {
  },
  onUnload () {
    this.chooseNavNumber = '0';
  },
  methods: {
    chooseNav (e) {
      this.chooseNavNumber = e;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
