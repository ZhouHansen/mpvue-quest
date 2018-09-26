<template>
  <div class="children-add-container">
    <div class="child-add-content">
      <div class="item">
        <div class="item-label">孩子姓名</div>
        <div class="item-input">
          <input type="text" placeholder="输入孩子姓名">
        </div>
      </div>
      <div class="item">
        <div class="item-label">性别</div>
        <div class="picker-contain">
          <picker @change="bindGenderChange" :value="genderValue" :range="genderArray">
            <div class="item-input">
              <span>{{genderArray[genderValue]}}</span>
              <span class="item-arrow-icon"></span>
            </div>
          </picker>
        </div>
      </div>
      <div class="item">
        <div class="item-label">
          <span>出生日期</span>
          <hoo-tips :text="'我们将为届时孩子赠送生日礼包！'"></hoo-tips>
        </div>
        <div class="picker-contain">
          <picker @change="bindDateChange" :value="dateVal" :end="endDate" :mode="'date'">
            <div class="item-input">
              <span>{{dateVal?dateVal:'请选择出生日期'}}</span>
              <span class="item-arrow-icon"></span>
            </div>
          </picker>
        </div>
      </div>
      <div class="item">
        <div class="item-label">年龄</div>
        <div class="item-input">
          <span>{{ageVal?ageVal + '岁':''}}</span>
        </div>
      </div>
      <div class="item">
        <div class="item-label">
          <span>身份证信息</span>
          <hoo-tips :text="'用于必要时购买保险使用！'"></hoo-tips>
        </div>
        <div class="item-input">
          <input type="text" id="idCard" placeholder="输入身份证信息" :value="idCard">
        </div>
      </div>
    </div>
    <div class="footer">
      <hoo-button :text="'保存'" :type="'topic'" @tapButton="submit"></hoo-button>
    </div>
  </div>
</template>
<script>
import Utils from '@/utils/index';
import hooButton from '@/components/button';
import hooTips from '@/components/tips';

export default {
  components: {
    hooButton,
    hooTips
  },
  props: [],
  data () {
    return {
      id: null,

      dateVal: null,

      genderArray: ['男', '女'],
      genderValue: 0,

      ageVal: null
    };
  },
  computed: {
    endDate () {
      return Utils.formatDateToPicker(new Date());
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.$wxUtils.setNavTitle('编辑孩子');
    } else {
      this.$wxUtils.setNavTitle('添加孩子');
      this.id = null;
    }
    console.log(this.id);
  },
  methods: {
    getChildernInf () {
    },

    bindGenderChange (e) {
      this.genderValue = e.mp.detail.value;
    },

    bindDateChange (e) {
      console.log(e);
      this.dateVal = e.mp.detail.value;

      this.ageVal = parseInt(this.endDate.slice(0, 5)) - parseInt(this.dateVal.slice(0, 5)) + 1;
    },

    submit () {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .children-add-container {
    min-height: 100vh;
    background-color: #f9f9f9;

    .child-add-content {
      background-color: #ffffff;
      padding: 80rpx 80rpx 40rpx 80rpx;

      .item {
        border-bottom: 1rpx solid #eaeaea;
        padding: 29rpx 5rpx 29rpx 0;
        @include flex();

        .item-label {
          font-size: 16px;
          flex-basis: 40%;
          flex-shrink: 0;
        }

        .picker-contain {
          width: 100%;
        }

        .item-input {
          font-size: 16px;
          color: #000000;
          width: 100%;
          @include flex();

          .item-arrow-icon {
            width: 24rpx;
            height: 24rpx;
            display: inline-block;
            margin-right: 16rpx;
            flex-shrink: 0;
            @include backgroundImg('../../assets/images/arrows_search.png');
          }
        }
      }
    }

    .footer {
      width: calc(100vw - 80rpx);
      position: fixed;
      bottom: 40rpx;
      left: 40rpx;
    }
  }
</style>
