<template>
  <div class="order-list-container">
    <hoo-nav :tabs="navData" @tapNavItem="chooseNav" :checkIndex="chooseNavNumber" :unOnShowDefault="true"></hoo-nav>
    <course-calendar-page v-if="chooseNavNumber === '0'" @sendOrderLength="getOrderLength"></course-calendar-page>
    <puchase-goods-page v-if="chooseNavNumber === '1'" @sendOrderLength="getOrderLength"></puchase-goods-page>
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
      navData: [
        {text: '课程日历', bubbleText: '', id: 'course'},
        {text: '购买书籍', bubbleText: '', id: 'puchase'}
      ],
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
    },

    getOrderLength (e) {
      this.navData.map((item, index) => {
        if (item.id === e.id) {
          item.bubbleText = e.num;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
