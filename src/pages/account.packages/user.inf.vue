<template>
  <div class="user-inf-container">
    <div class="section user-avatar">
      <div>
        <hoo-avatar :type="'big'" :avatar="avatar"></hoo-avatar>
      </div>
      <div class="edit-avatar" @click="editAvatar">
        <span>修改头像</span>
        <span class="edit-avatar-icon"></span>
      </div>
    </div>
    <div class="section">
      <div class="section-label">昵称</div>
      <div class="section-edit">
        <input type="text" placeholder="请设置昵称" :value="nickname" @change="editUserInf" :placeholder-class="'input-placeholder-user'" id="nickname">
      </div>
    </div>
    <div class="section">
      <div class="section-label">真实姓名</div>
      <div class="section-edit">
        <input type="text" placeholder="请设置真实姓名" :value="name" @change="editUserInf" :placeholder-class="'input-placeholder-user'" id="name">
      </div>
    </div>
    <div class="section">
      <div class="section-label">注册信息</div>
      <div class="section-edit register-edit" v-if="phoneVal">
        <input type="number" id="phone" placeholder="17645091513" :value="phoneVal" :placeholder-class="'input-placeholder-user'" :disabled="'true'">
        <div class="section-edit-text" @click="editPhone">修改</div>
      </div>
      <div class="section-edit register-edit" v-if="!phoneVal">
        <div class="section-edit-text" @click="editPhone">去绑定</div>
      </div>
    </div>
    <div class="section">
      <div class="section-label">性别</div>
      <div class="section-edit">
        <picker @change="bindGenderChange" :value="genderValue" :range="genderArray">
          <div class="gender-edit">
            <span>{{genderArray[genderValue]}}</span>
            <span class="section-icon"></span>
          </div>
        </picker>
      </div>
    </div>
    <div class="section">
      <div class="section-label">地区</div>
      <div class="section-edit">
        <input type="text" id="area" :value="area" :placeholder-class="'input-placeholder-user'" @change="editUserInf" placeholder="请输入地区">
      </div>
    </div>

    <div class="footer">
      <hoo-button :text="'保存'" :type="'topic'"></hoo-button>
    </div>
  </div>
</template>
<script>
import hooAvatar from '@/components/avatar';
import hooButton from '@/components/button';

export default {
  components: {
    hooAvatar,
    hooButton
  },
  props: [],
  data () {
    return {
      wxUserInf: this.$storage.get(this.$storageTypeName['wxUserInf']),
      avatar: '',
      nickname: '',
      name: '王岩',
      area: '大连',
      phoneVal: 17645091513,

      genderArray: ['男', '女'],
      genderValue: 0
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('个人信息');
    this.getUserInf();
  },
  onUnload () {
    console.log('离开页面');
  },
  methods: {
    getUserInf () {
      // 如果获取的用户信息没有这个参数，就默认填上。用户保存时一块上传到后台

      this.avatar = this.wxUserInf.avatarUrl;
      this.nickname = this.wxUserInf.nickName;
      this.genderValue = this.wxUserInf.gender - 1;
    },

    editAvatar () {
      this.$wxUtils.chooseImg({num: 1}).then(res => {
        console.log('选择图片', res);
        this.$wxNetwork.uploadFile({url: res.tempFilePaths[0]}).then(res => {
          console.log('图片上传成功', res);
        });
        this.avatar = res.tempFilePaths[0];
      });
    },

    editPhone () {
      this.$router.push('/pages/account.packages/bind.phone');
    },

    bindGenderChange (e) {
      console.log(e);
      this.genderValue = e.mp.detail.value;
    },

    editUserInf (e) {
      this[e.mp.target.id] = e.mp.detail.value;
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../../assets/style/variables.scss';

  .user-inf-container {
    padding: 40rpx 80rpx;
    position: relative;
    min-height: 80vh;
    padding-bottom: calc(20vh - 80rpx);

    .input-placeholder-user {
      font-size: 16px;
    }

    .section {
      padding: 30rpx 0;
      border-bottom: $searchItemTopBorder;
      @include flex(flex-start);

      .section-label {
        font-size: 16px;
        flex-basis: 35%;
        flex-shrink: 0;
      }

      .section-edit {
        flex-basis:100%;
        input {
          color: #000000;
          font-size: 16px;
        }

        input[disabled] {
          color: #9F9F9F;
        }
      }

      .section-icon {
        width: 24rpx;
        height: 24rpx;
        display: inline-block;
        margin-right: 16rpx;
        @include backgroundImg('../../assets/images/arrows_search.png');
      }
    }

    .user-avatar {

      .edit-avatar {
        margin-left: 30rpx;

        span {
          vertical-align: middle;
        }
        .edit-avatar-icon {
          width: 24rpx;
          height: 24rpx;
          display: inline-block;
          @include backgroundImg('../../assets/images/arrow_right.png');
        }
      }
    }

    .register-edit {
      @include flex();

      .section-edit-text {
        flex-shrink: 0;
        color: $topic-color;
      }
    }

    .gender-edit {
      width: 100%;
      @include flex();
    }

    .footer {
      width: calc(100vw - 80rpx);
      position: fixed;
      bottom: 40rpx;
      left: 40rpx;
    }

  }
</style>
