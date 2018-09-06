<template>
  <div class="search-header-container">
    <div class="weui-search-bar">
      <div class="weui-search-bar__form">
        <div class="weui-search-bar__box flex-row-start">
          <div class="choose-search-type">
            <hoo-select></hoo-select>
          </div>
          <input type="text" class="weui-search-bar__input ellipsis" placeholder="搜索课程、活动、老师、学校" :placeholder-class="'input-placeholder'" v-model="inputVal" @input="inputTyping" />
        </div>
      </div>
      <div class="start-search weui-search-bar__cancel-btn" @click="startSearch">搜索</div>
    </div>
  </div>
</template>
<script>
  import Select from '@/components/select';

  export default {
    components: {
      hooSelect: Select
    },
    data () {
      return {
        inputVal: ''
      };
    },
    methods: {
      inputTyping (e) {
        this.inputVal = e.mp.detail.value;
      },

      startSearch (e) {
        this.$network.search.search({
          method: 'get'
        }).then(res => {

        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  .search-header-container {
    color: #454545;
    .weui-search-bar {
      background-color: #ffffff;
      border: 0;
      padding: 16rpx 5%;

      .weui-search-bar__form {
        border-radius: 50rpx;
        overflow: hidden;
        border: 1rpx solid $search-input-border;
        background-color:#fafafa;

        .weui-search-bar__box {
          padding: 6rpx 30rpx;

          .choose-search-type {
            flex-shrink: 0;
            padding-right:10rpx;
            border-right:1px solid #e6e6e6;
          }

          .weui-search-bar__input {
            width: 100%;
            padding-left: 10rpx;
          }
        }
      }

      .start-search {
        color: $topic-color;
        line-height: 72rpx;
        font-size: 15px;
      }
    }
  }
</style>
