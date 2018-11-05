<template>
  <div class="children-add-container">
    <div class="child-add-content">
      <div class="item">
        <div class="item-label">孩子姓名</div>
        <div class="item-input">
          <input type="text" placeholder="输入孩子姓名" id="name" :value="name" @change="bindInput">
        </div>
      </div>
      <div class="item">
        <div class="item-label">性别</div>
        <div class="picker-contain">
          <picker @change="bindGenderChange" :value="genderValue" :range-key="'text'" :range="genderArray">
            <div class="item-input">
              <span>{{genderArray[genderValue].text}}</span>
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
          <hoo-tips :text="'用于必要时购买保险使用！'" :show="showTips"></hoo-tips>
        </div>
        <div class="item-input">
          <input type="text" id="idCard" placeholder="输入身份证信息" :value="idCard" @focus="showTip" @change="bindInput">
        </div>
      </div>
    </div>
    <div class="footer">
      <hoo-button :text="'保存'" :type="'topic'" @tapButton="submit"></hoo-button>
    </div>
  </div>
</template>
<script>
import * as MutationType from '@/store/mutation.type';
import Utils from '@/utils/index';
import hooButton from '@/components/button';
import hooTips from '@/components/tips';
import { setTimeout } from 'timers';

export default {
  components: {
    hooButton,
    hooTips
  },
  data () {
    return {
      id: null,
      dateVal: null,
      genderArray: [
        {text: '女', id: 'M'},
        {text: '男', id: 'F'}
      ],
      genderValue: 0,
      ageVal: null,
      idCard: '',
      name: '',

      firstShowTips: true,
      showTips: false
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

      this.getChildernInf();
    } else {
      this.$wxUtils.setNavTitle('添加孩子');
      this.id = 0;
    }
    // console.log(this.id);
  },
  methods: {
    showTip () {
      if (this.firstShowTips) {
        this.showTips = true;
        this.firstShowTips = false;
      }
    },

    getChildernInf () {
      this.$wxUtils.loading({title: '加载中...'});
      // console.log(JSON.parse(this.$route.query.obj));
      let params = JSON.parse(this.$route.query.obj);
      this.idCard = params.ssn;
      this.genderValue = params.gender === 'M' ? 0 : 1;
      this.dateVal = params.birthday;
      this.name = params.name;

      this.ageVal = parseInt(this.endDate.slice(0, 5)) - parseInt(this.dateVal.slice(0, 5)) + 1;
      this.$wxUtils.loading({show: false});
    },

    bindGenderChange (e) {
      this.genderValue = e.mp.detail.value;
    },

    bindDateChange (e) {
      // console.log(e);
      this.dateVal = e.mp.detail.value;
      this.ageVal = parseInt(this.endDate.slice(0, 5)) - parseInt(this.dateVal.slice(0, 5)) + 1;
    },

    bindInput (e) {
      this[e.target.id] = e.mp.detail.value;
    },

    submit () {
      let requestPrams = {
        birthday: this.dateVal,
        gender: this.genderArray[this.genderValue].id,
        id: this.id,
        name: this.name,
        ssn: this.idCard
      };

      for (let i in requestPrams) {
        // 不需要检测id ,因为不是用户输入的
        if (!requestPrams[i] && i !== 'id' && i !== 'ssn') {
          // console.log(requestPrams[i]);
          this.$wxUtils.toast({title: '请填写全部信息'});
          return;
        }
      }

      // console.log(requestPrams);

      this.$network.account.postChildrenInf(requestPrams).then(res => {
        // console.log(res);
        if (res.e === 0) {
          this.$wxUtils.toast({title: '提交信息成功'});

          if (this.$route.query.type === 'order') {
            this.$store.commit(MutationType.SET_ORDER_PARAMS, {children: requestPrams});
          }

          setTimeout(() => {
            this.$router.back();
          }, 2000);
        } else {
          this.$wxUtils.toast({title: '提交失败请重试'});
        }
      });
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
