<template>
  <div :class="{'overflow-hidden': overflowHiddenStatus}">
    <section-detail :params="sectionData" v-if="sectionData"></section-detail>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import sectionDetail from '@/module/discovery/section.detail';

  export default {
    components: {
      sectionDetail
    },
    data () {
      return {
        sectionData: null
      };
    },
    computed: mapState([
      'overflowHiddenStatus'
    ]),
    mounted () {
      if (this.$route.query.type === 'product') {
        this.getProductDetail();
      } else {
        this.getActivityDetail();
      }
    },
    methods: {
      getActivityDetail () {
        this.$network.discovery.getActivityDetail({}, null, 'weapp/lesson/' + this.$route.query.id).then(res => {
          // console.log(res.data);
          this.sectionData = res.data;
        }).catch(err => {
          console.log(err);
        });
      },

      getProductDetail () {
        this.$network.discovery.getProductDetail({}, null, 'weapp/product/' + this.$route.query.id).then(res => {
          // console.log(res.data);
          this.sectionData = res.data;
        }).catch(err => {
          console.log(err);
        });
      }
    },
    onShareAppMessage (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target);
      }
      return {
        title: '学课程，拿奖学金，学习乐翻天！',
        path: '/pages/home/section.detail?type=' + this.$route.query.type + '&id=' + this.$route.query.id,
        imageUrl: this.sectionData.coverfile
      };
    }
  };
</script>
<style lang="scss" scoped>
</style>
