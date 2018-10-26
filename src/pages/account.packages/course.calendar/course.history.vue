<template>
  <div class="course-history-container">
    <course-list :params="courseList"></course-list>
  </div>
</template>
<script>
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import courseList from '@/module/course/course.list';

export default {
  components: {
    courseList
  },
  data () {
    return {
      courseList: [],
      limit: 15,
      offset: 0,
      total: 0
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('学习记录');
    this.getHistory();
  },
  methods: {
    getHistory () {
      let requestParams = {
        limit: this.limit,
        offset: this.limit
      };
      this.$network.account.getOrderHIstory(requestParams, null, 'weapp/closedorders/lesson').then(res => {
        console.log(res);
        res.data.forEach((item, index) => {
          this.courseList.push(item.product);
        });

        this.courseList = uniqWith(this.courseList, isEqual);
        console.log(this.courseList);
        this.total = res.total;
      });
    }
  },
  onReachBottom () {
    if (this.total > this.offset + this.limit) {
      this.offset = this.offset + this.limit;
      this.getHistory();
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/style/variables.scss';

  .course-history-container {
  }
</style>
