<template>
  <div class="search-teacher-container">
    <div class="teacher-filter-list">
      <div class="teacher-filter-item" @click="chooseFilter('teacher_type')">
        <div class="filter-item-select">
          <hoo-select :filter="{text: '学科', event: 'teacher_type'}"></hoo-select>
        </div>
      </div>
      <div class="teacher-filter-item" @click="chooseFilter('teacher_auth')">
        <div class="filter-item-select">
          <hoo-select :filter="{text:'认证', event: 'teacher_auth'}"></hoo-select>
        </div>
      </div>
      <div class="teacher-filter-item" @click="getOrderList">
        <div class="teacher-praise">
          <span>好评</span>
          <span class="teacher-praise-icon"
           :class="{
            'normal-icon': orderContrl === 'normal',
            'positive-order-icon': orderContrl === 'positive',
            'negative-order-icon': orderContrl === 'negative'}"></span>
        </div>
      </div>
    </div>
    <div class="teacher-content">
      <div class="teacher-filter-item-desc" :hidden="!showFilterItemDesc">
        <filter-list @chooseFilterDone="doneChooseFilter" :filter="chooseFilterData" :checkedFilter="checkedFilter[chooseFilterType]"></filter-list>
      </div>
      <div class="teacher-list">
        <hoo-teacher-list :params="teacherData" v-if="teacherData"></hoo-teacher-list>
        <search-empty v-if="!teacherData"></search-empty>
      </div>
    </div>
  </div>
</template>
<script>
  import * as MutationsType from '@/store/mutation.type';
  import hooSelect from '@/components/select';
  import filterList from '@/module/search/search.header.filter.list';
  import hooTeacherList from '@/module/teacher/teacher.list';
  import searchEmpty from '@/module/search/search.empty';

  export default {
    props: ['filterObject'],
    components: {
      hooSelect,
      filterList,
      hooTeacherList,
      searchEmpty
    },
    data () {
      return {
        teacherData: null,
        showFilterItemDesc: false,
        chooseFilterType: '',
        orderContrl: 'normal',
        filterData: {
          teacher_type: [
            {text: '全部', id: '1'},
            {text: '数学', id: '2'},
            {text: '英文', id: '3'},
            {text: '美术', id: '4'}
          ],
          teacher_auth: [
            {text: '全部', id: '1'},
            {text: '已认证', id: '2'}
          ]
        },
        chooseFilterData: null,
        checkedFilter: {
          orderContrl: 'normal'
        }
      };
    },
    mounted () {
      this.sendSearchRequest();
    },
    methods: {
      chooseFilter (e) {
        if (this.chooseFilterType === '') {
          this.chooseFilterType = e;
          if (!this.showFilterItemDesc) {
            this.showFilterItemDesc = true;
            this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, true);
          }
        } else
        if (this.chooseFilterType === e) {
          this.showFilterItemDesc = !this.showFilterItemDesc;
          this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, this.showFilterItemDesc);
          return false;
        } else
        if (this.chooseFilterType !== e) {
          this.chooseFilterType = e;
          if (!this.showFilterItemDesc) {
            this.showFilterItemDesc = true;
            this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, true);
          }
        }

        this.chooseFilterData = this.filterData[this.chooseFilterType];

        if (!this.checkedFilter[this.chooseFilterType]) {
          this.checkedFilter[this.chooseFilterType] = {
            type: this.chooseFilterType,
            id: null
          };
        }
      },

      doneChooseFilter (e) {
        console.log('接收到的过滤参数', e);
        if (this.checkedFilter[this.chooseFilterType].id !== e) {
          let params = {
            id: e,
            type: this.chooseFilterType
          };
          this.checkedFilter[this.chooseFilterType] = params;
        } else {
          this.checkedFilter[this.chooseFilterType] = null;
        }
        this.showFilterItemDesc = false;

        this.sendSearchRequest();
      },

      getOrderList () {
        console.log('修改排序');
        if (this.showFilterItemDesc) {
          this.showFilterItemDesc = false;
          this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, false);
        }

        if (this.orderContrl === 'normal') {
          this.orderContrl = 'positive';
        } else
        if (this.orderContrl === 'positive') {
          this.orderContrl = 'negative';
        } else {
          this.orderContrl = 'normal';
        }

        this.checkedFilter.orderContrl = this.orderContrl;
        this.sendSearchRequest();
      },

      sendSearchRequest () {
        this.$wxUtils.loading({title: '查找中...'});
        let params = Object.assign(this.filterObject, this.checkedFilter);
        console.log('查找过滤的参数 老师', params);
        this.$network.search.searchTearch({params: params}).then(res => {
          this.alreadyUseSearch = true;
          console.log('返回查找老师数据', res);
          this.$wxUtils.loading({show: false});
          this.teacherData = res.data;
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
<style lang="scss" scope>

  @import '../../assets/style/variables.scss';

  .search-teacher-container {
    width: 100%;

    .teacher-filter-list {
      @include flex(space-between, center);
      padding: 0 20rpx;


      .teacher-filter-item {
        width: 34%;
        padding: 24rpx 0;

        .filter-item-select {
          padding: 0 6vw;
          border-right: 1rpx solid #f2f2f2;
        }

        .teacher-praise {
          @include flex(space-between, center);
          padding: 0 6vw;


          .teacher-praise-icon {
            width: 24rpx;
            height: 24rpx;
          }

          .normal-icon {
            background: url('../../assets/images/list_nor.png') no-repeat 50% 50%;
            background-size: contain;
          }

          //正序
          .positive-order-icon {
            background: url('../../assets/images/list_nor_p.png') no-repeat 50% 50%;
            background-size: contain;
          }
          //倒序
          .negative-order-icon {
            background: url('../../assets/images/list_nor_n.png') no-repeat 50% 50%;
            background-size: contain;
          }
        }
      }
    }

    .teacher-content {
      position: relative;

      .teacher-list {
        height: calc(100vh - 200rpx);
        overflow-y: auto;
      }
    }
  }
</style>
