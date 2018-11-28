<template>
  <div :class="{'overflow-hidden': overflowHiddenStatus}">
    <section-detail :params="sectionData" v-if="sectionData"></section-detail>
    <link-home v-if="isShare"></link-home>
  </div>
</template>
<script>
  import * as MutationsType from '@/store/mutation.type';
  import { mapState } from 'vuex';
  import linkHome from '@/components/linkhome';
  import sectionDetail from '@/module/discovery/section.detail';

  export default {
    components: {
      linkHome,
      sectionDetail
    },
    data () {
      return {
        sectionData: null,
        isShare: false,
        shareType: '' // 转发类型lesson  or  product
      };
    },
    computed: mapState([
      'overflowHiddenStatus'
    ]),
    mounted () {
      this.shareType = this.$route.query.type;
      console.log('页面参数', this.$route.query);
      if (this.$route.query.isshare === '1') {
        this.isShare = true;
      }

      if (this.$route.query.type === 'product') {
        this.getProductDetail();
      } else {
        this.getActivityDetail();
      }
    },
    methods: {
      getActivityDetail () {
        this.$wxUtils.loading({title: '加载中...'});
        this.$network.discovery.getActivityDetail({}, null, 'weapp/lesson/' + this.$route.query.id).then(res => {
          // console.log(res.data);
          this.sectionData = res.data;
          this.$wxUtils.loading({show: false});
          this.storeSectionData();
        }).catch(err => {
          console.log(err);
        });
      },

      getProductDetail () {
        this.$wxUtils.loading({title: '加载中...'});
        this.$network.discovery.getProductDetail({}, null, 'weapp/product/' + this.$route.query.id).then(res => {
          // console.log(res.data);
          this.sectionData = res.data;
          this.$wxUtils.loading({show: false});
          this.storeSectionData();
        }).catch(err => {
          console.log(err);
        });
      },

      storeSectionData () {
        let params = {
          id: undefined,
          price: undefined,
          coverfile: undefined,
          coverfile2: undefined,
          name: undefined,
          address: undefined,
          biref: undefined,
          ages: undefined,
          spec: undefined,
          grouplist: undefined
        };

        for (let i in params) {
          params[i] = this.sectionData[i];
        }

        let title = this.sectionData.name.substr(0, 8);
        if (this.sectionData.name.length > 8) {
          title = title + '...';
        }
        this.$wxUtils.setNavTitle(title);
        this.$store.commit(MutationsType.SET_CHOOSE_ACTIVITY, params);
      }
    },
    onShareAppMessage (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        // console.log('转发参数', res);
        this.$network.base.recordShare({}, null, 'weapp/share/' + this.shareType + '/' + this.$route.query.id);
      }
      return {
        title: this.sectionData.name,
        path: '/pages/home/section.detail?isshare=1&type=' + this.$route.query.type + '&id=' + this.$route.query.id,
        imageUrl: this.sectionData.coverfile
      };
    }
  };
</script>
<style lang="scss" scoped>
</style>
