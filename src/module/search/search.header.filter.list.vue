<template>
  <div class="search-filter-container">
    <div class="filter-list" v-if="checkedFilter && checkedFilter.type !== 'course_type'">

      <div class="filter-item" v-if="!filter[0].children" v-for="(item, index) in filter" :key="index"
       :class="{'filter-checked': checkedFilter && checkedFilter.id === item.id}"
       @click="chooseFilterParam(item.id)">{{item.text}}</div>

      <div v-if="filter[0].children" v-for="(item, index) in filter" :key="index">
        <div class="filter-item"
          :class="{'filter-checked': checkedFilter && checkedFilter.id === item.id}"
          :id="item.id"
          @click="chooseFilterParamLevel(item.id)"
          >{{item.text}}</div>
        <div class="filter-second-level" v-if="item.showChildren" v-for="(child , cindex) in item.children" :key="cindex">
          <div class="filter-item-second-level"
          :class="{'filter-item-second-level-checked': checkedFilter && checkedFilter.id === item.id && checkedFilter.child && checkedFilter.child.id === child.id}"
          @click="doneChooseFilterParamLevel(child)"
          >{{child.text}}</div>
        </div>
      </div>
    </div>

    <div class="course-filter-list" v-if="checkedFilter && checkedFilter.type === 'course_type'">
      <div class="course-filter-item"
        v-for="(item, index) in filter" :key="index"
        :class="{'course-filter-item-checked': checkedFilter && checkedFilter.id === item.id}" @click="chooseFilterParam(item.id)">
        <div class="course-filter-item-icon">
          <img :src="item.icon" />
        </div>
        <p class="course-filter-item-text">{{item.text}}</p>
      </div>
    </div>

    <div class="hide-search-filter" @click="hideFilterParam"><span>关闭</span></div>
  </div>
</template>
<script>
import * as MutationsType from '@/store/mutation.type';

export default {
  props: ['filter', 'checkedFilter', 'id'],
  data () {
    return {
      // filter: [
      //   {
      //     id: 'asd',
      //     text: 'asdad',
      //     showChildren: false,
      //     children: [
      //       {id: 'asc', text: '111'},
      //       {id: 'asd_2', text: '222'}
      //     ]
      //   },
      //   {
      //     id: 'dddd',
      //     text: 'asddddd',
      //     showChildren: false,
      //     children: [
      //       {id: 'asc', text: 'b111'},
      //       {id: 'basd_2', text: 'b222'}
      //     ]
      //   }
      // ],
      // checkedFilter: {
      //   id: 'asd',
      //   text: 'asdad',
      //   child: {
      //     id: 'asc',
      //     text: '111'
      //   }
      // },
      chooseFilter: {
        id: null,
        text: null,
        child: {
          id: null,
          text: null
        }
      }
    };
  },
  mounted () {
  },
  methods: {
    chooseFilterParam (e) {
      this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, false);
      let commitData = this.filter.filter((item, index) => {
        return item.id === e;
      });
      this.$emit('chooseFilterDone', commitData[0]);
    },

    chooseFilterParamLevel (e) {
      this.filter.map((item, index) => {
        item.showChildren = false;
        if (item.id === e) {
          if (this.chooseFilter.id !== e) {
            item.showChildren = true;
            this.chooseFilter.id = item.id;
            this.chooseFilter.text = item.text;
          } else {
            this.chooseFilter.id = null;
            this.chooseFilter.text = null;
          }
        }
      });
    },

    doneChooseFilterParamLevel (e) {
      this.chooseFilter.child = e;
      this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, false);
      this.$emit('chooseFilterDone', this.chooseFilter);
    },

    hideFilterParam () {
      this.$store.commit(MutationsType.TOGGLE_SEARCH_OVERFLOW, false);
      this.$emit('cancleChooseFilter');
    }
  }
};
</script>
<style lang="scss" scoped>
  $art: require('../assets/images/ic_art.png');
  .search-filter-container {
    width: 100%;
    position: absolute;
    top: 0;
    height: 100vh;
    color: #9f9f9f;
    background-color:#fff;
    z-index: 2;
    padding-top:10rpx;

    .filter-list {
      overflow-y: auto;
      max-height: 80%;


      .filter-item {
        padding: 24rpx 40rpx;
        border-bottom: 1rpx solid #e1e1e1;
      }

      .filter-checked {
        color: #000000;
      }

      .filter-second-level {
        animation: fadeIn 0.5s;
      }

      .filter-item-second-level {
        padding: 24rpx 60rpx;
        border-bottom: 1rpx solid #e1e1e1;
      }

      .filter-item-second-level-checked {
        color: #000000;
        background-color: rgba(50, 218, 49, 0.1);
      }
    }

    .course-filter-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: center;
      padding: 0 5%;
      overflow-y: auto;
      max-height: 80%;


      .course-filter-item {
        flex-shrink: 0;
        width: calc((100% - 16% - 80rpx) / 4);
        box-shadow: 0 4rpx 20rpx #D4D4D4;
        padding: 20rpx 2%;
        margin: 10rpx 10rpx;
        text-align: center;

        .course-filter-item-icon {
          img {
            display: inline-block;
            width: 50rpx;
            height: 50rpx;
          }
        }
      }

      .course-filter-item-checked {
        background-color: #f0f0f0;
      }

    }

    .hide-search-filter {
      padding: 50rpx 0 30rpx;
      text-align: center;

      span {
        display: inline-block;
        width: 40%;
        padding: 10rpx 0;
        text-align: center;
        border-radius: 10rpx;
        border: 1rpx solid #999;
      }
    }
  }
</style>
