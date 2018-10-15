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
      <div class="section-label">手机号码</div>
      <div class="section-edit register-edit" v-if="phoneVal">
        <input type="number" id="phone" :placeholder="phoneVal" :value="phoneVal" :placeholder-class="'input-placeholder-user'" :disabled="'true'">
        <div class="section-edit-text" @click="editPhone">修改</div>
      </div>
      <div class="section-edit register-edit" v-if="!phoneVal">
        <div class="section-edit-text" @click="editPhone">去绑定</div>
      </div>
    </div>
    <div class="section">
      <div class="section-label">性别</div>
      <div class="section-edit">
        <picker @change="bindGenderChange" :value="genderValue" :range-key="'text'" :range="genderArray">
          <div class="gender-edit">
            <span>{{genderArray[genderValue].text}}</span>
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
      <hoo-button :text="'保存'" :type="'topic'" @tapButton="submit"></hoo-button>
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
      wxUserInf: this.$storage.get(this.$storageTypeName.wxUserInf),
      userInf: this.$storage.get(this.$storageTypeName.userInf),
      avatar: '../../img/logo.png',
      nickname: '',
      name: '',
      area: '',
      phoneVal: '',

      genderArray: [
        {text: '女', id: 'M'},
        {text: '男', id: 'F'}
      ],
      genderValue: 0,
      chooseImgPath: '',
      uploadImgPath: ''
    };
  },
  mounted () {
    this.$wxUtils.setNavTitle('个人信息');
    this.$wxUtils.loading({title: '加载中...'});
    this.getUserInf();
  },
  onShow () {
  },
  onUnload () {
    console.log('离开页面');
  },
  methods: {
    getUserInf () {
      // 如果获取的用户信息没有这个参数，就默认填上。用户保存时一块上传到后台
      if (this.userInf && this.userInf.avatar && this.userInf.avatar.indexOf('http') > -1) {
        this.avatar = this.userInf.avatar;
      } else {
        this.avatar = this.wxUserInf.avatarUrl;
        this.uploadImgPath = this.wxUserInf.avatarUrl;
      }

      if (this.userInf && this.userInf.decodednickname) {
        this.nickname = this.userInf.decodednickname;
      } else {
        this.nickname = this.wxUserInf.nickName;
      }

      if (this.userInf && this.userInf.gender) {
        if (this.userInf.gender === 'F') {
          this.genderValue = 1;
        } else {
          this.genderValue = 0;
        }
      } else {
        this.genderValue = this.wxUserInf.gender - 1;
      }

      this.phoneVal = this.userInf.cell;
      this.name = this.userInf.decodedname;
      this.area = this.userInf.city;

      this.$wxUtils.loading({show: false});
    },

    editAvatar () {
      this.$wxUtils.chooseImg({num: 1}).then(res => {
        console.log('选择图片', res);
        this.chooseImgPath = res.tempFilePaths[0];
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
    },

    uploadImg () {
      return new Promise((resolve, reject) => {
        if (this.chooseImgPath) {
          this.$wxNetwork.uploadFile({url: this.chooseImgPath}).then(res => {
            // console.log(res);
            this.uploadImgPath = 'https://h.dyglxt.com' + res.url;
            resolve();
          }).then(res => {
            resolve();
          });
        } else {
          resolve();
        }
      });
    },

    uploadUserInf () {
      let requestParams = {
        'avatarurl': this.uploadImgPath ? this.uploadImgPath : undefined,
        'cell': this.phoneVal,
        'city': this.area ? this.area : undefined,
        'gender': this.genderArray[this.genderValue].id,
        'name': this.name ? this.name : undefined,
        'nickname': this.nickname ? this.nickname : undefined
        // 'province': 'string'
      };

      this.$network.base.uploadUserInf(requestParams).then(res => {
        this.$wxUtils.loading({show: false});
        if (res.e === 0) {
          this.$wxUtils.toast({title: '修改成功'});
          setTimeout(() => {
            this.$router.back();
          }, 2000);
        }
      });
    },

    submit () {
      if (!this.phoneVal) {
        this.$wxUtils.toast({title: '请先绑定手机号'});
        return;
      }

      if (!this.area || !this.name || !this.nickname) {
        this.$wxUtils.toast({title: '请将信息填写完整'});
        return;
      }

      this.$wxUtils.loading({title: '上传中...'});
      this.uploadImg().finally(() => {
        console.log('继续上传参数');
        this.uploadUserInf();
      });
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
