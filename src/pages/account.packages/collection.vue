<template>
  <div class="collection-container">
      <hoo-nav @tapNavItem="chooseNav" :tabs="tabData" :checkIndex="chooseNavIndex" :unOnShowDefault="true"></hoo-nav>
      <div class="show-content" v-if="chooseNavIndex === '0'">
        <scroll-view scroll-y scroll-with-animation @scrolltolower="loadMore">
          <course-list :params="collectionData.lesson.data"></course-list>
        </scroll-view>
      </div>
      <div class="show-content" v-if="chooseNavIndex === '1'">
        <scroll-view scroll-y scroll-with-animation @scrolltolower="loadMore">
          <teacher-list :params="collectionData.teacher.data"></teacher-list>
        </scroll-view>
      </div>
      <div class="show-content" v-if="chooseNavIndex === '2'">
        <scroll-view scroll-y scroll-with-animation @scrolltolower="loadMore">
          <organization-list :params="collectionData.institution.data"></organization-list>
        </scroll-view>
      </div>
      <div class="show-content" v-if="chooseNavIndex === '3'">
        <scroll-view scroll-y scroll-with-animation @scrolltolower="loadMore">
          <course-list :params="collectionData.product.data"></course-list>
        </scroll-view>
      </div>
  </div>
</template>
<script>
  import Utils from '@/utils/index';
  import hooNav from '@/components/nav';
  import courseList from '@/module/course/course.list';
  import organizationList from '@/module/organization/organization.list';
  import teacherList from '@/module/teacher/teacher.list';
  export default {
    components: {
      hooNav,
      courseList,
      organizationList,
      teacherList
    },
    props: [],
    data () {
      return {
        tabData: ['课程', '老师', '机构', '商品'],
        chooseNavIndex: '0',
        ogroup: 'lesson',
        collectionData: {
          lesson: {
            limit: 15,
            offset: 0,
            total: 0,
            data: []
          },
          teacher: {
            limit: 15,
            offset: 0,
            total: 0,
            data: []
          },
          institution: {
            limit: 15,
            offset: 0,
            total: 0,
            data: []
          },
          product: {
            limit: 15,
            offset: 0,
            total: 0,
            data: []
          }
        }
      };
    },
    mounted () {
      this.getCollectionData();
    },
    onUnload () {
      this.chooseNavIndex = '0';
    },
    methods: {
      chooseNav (e) {
        console.log('接收到点击的nav', e);
        this.chooseNavIndex = e;
        switch (e) {
        case '0':
          this.ogroup = 'lesson';
          break;
        case '1':
          this.ogroup = 'teacher';
          break;
        case '2':
          this.ogroup = 'institution';
          break;
        case '3':
          this.ogroup = 'product';
          break;
        }

        this.collectionData[this.ogroup].offset = 0;
        this.collectionData[this.ogroup].total = 0;
        this.collectionData[this.ogroup].data = [];

        this.getCollectionData();
      },

      getCollectionData () {
        this.$wxUtils.loading({title: '加载中...'});
        let requestParams = {
          limit: this.collectionData[this.ogroup].limit,
          offset: this.collectionData[this.ogroup].offset
        };

        this.$network.base.getCollectionList(requestParams, null, 'weapp/favors/' + this.ogroup).then(res => {
          this.$wxUtils.loading({show: false});

          let result = Utils.filterRepeatData(this.collectionData[this.ogroup].data, res.data);
          this.collectionData[this.ogroup].data = this.collectionData[this.ogroup].data.concat(result);
          this.collectionData[this.ogroup].total = res.total;
        });
      },

      loadMore () {
        if (this.collectionData[this.ogroup].total > this.collectionData[this.ogroup].offset + this.collectionData[this.ogroup].limit) {
          this.collectionData[this.ogroup].offset = this.collectionData[this.ogroup].offset + this.collectionData[this.ogroup].limit;
          this.getCollectionData();
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .collection-container {
    .show-content scroll-view{
      height: calc(100vh - 96rpx);
    }
  }
</style>
