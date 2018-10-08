{<template>
  <div class="search-header-container">
    <div class="weui-search-bar">
      <div class="weui-search-bar__form">
        <div class="weui-search-bar__box flex-row-start">
          <div class="choose-search-type">
            <picker class="weui-btn" @change="pickerSelect" :value="indexPicker" :range="array" :range-key="'text'">
              <hoo-select :filter="{text: selectText}"></hoo-select>
            </picker>
          </div>
          <input type="text" class="weui-search-bar__input ellipsis"
            placeholder="搜索课程、活动、老师、学校"
            :placeholder-class="'input-placeholder'"
            v-model="inputVal"
            @input="inputTyping"
            @focus="inputFocus"
            :focus="'true'"/>
        </div>
      </div>
      <div class="start-search weui-search-bar__cancel-btn" @click="startSearch">搜索</div>
    </div>

  </div>
</template>
<script>
  import _ from 'lodash/core';
  import hooSelect from '@/components/select';

  export default {
    components: {
      hooSelect
    },
    props: ['inputVal', 'inputValEnter'],
    data () {
      return {
        selectText: '',
        indexPicker: 0,
        array: [
          {text: '课程', type: 'course'},
          {text: '机构', type: 'organi'},
          {text: '老师', type: 'teacher'}
        ]
      };
    },
    mounted () {
      this.selectText = this.array[0].text;
      this.$emit('chooseFilterType', this.array[0].type);
    },
    onShow () {
      this.selectText = this.array[0].text;
      this.$emit('chooseFilterType', this.array[0].type);
    },
    methods: {
      inputTyping (e) {
        this.inputVal = e.mp.detail.value;
      },

      inputFocus (e) {
        this.$emit('inputFocus');
      },

      startSearch () {
        if (this.inputVal !== this.inputValEnter && this.inputVal !== '') {
          this.inputValEnter = this.inputVal;
          this.setSearchHistoryStorage();
          this.$emit('startSearchEvent', this.inputVal);
        }
      },

      setSearchHistoryStorage () {
        let search = {
          name: this.inputVal
        };
        let historyList = this.$storage.get(this.$storageTypeName.hr_search_history);
        let result = [];
        if (historyList && historyList.length > 0) {
          for (let i = 0; i < historyList.length; i++) {
            if (historyList[i].name === this.inputVal) {
              return;
            }
          }
          result = _.concat(search, historyList);
        } else {
          result.push(search);
        }

        if (result.length > 9) {
          result = result.slice(0, 10);
        }

        this.$storage.set(this.$storageTypeName.hr_search_history, result);
      },

      pickerSelect (e) {
        let index = e.mp.detail.value;
        this.selectText = this.array[index].text;
        this.indexPicker = index;

        this.$emit('chooseFilterType', this.array[index].type);
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .search-header-container {
    color: #454545;
    border-bottom: $navigateTitleBottomBorder;

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
            width:20%;
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
}
