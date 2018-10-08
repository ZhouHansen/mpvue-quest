<template>
  <div class="image-appraisal-container">
    <div class="choose-image-list">
      <div class="choose-image-item" v-for="(item, index) in imageList" :key="index">
        <image :src="item" />
        <div class="delete-image" @click="deleteImg(index)"></div>
      </div>
    </div>
    <div class="add-image" v-if="imageList.length < 3" @click="addImage"></div>
  </div>
</template>
<script>
import _ from 'lodash/core';

export default {
  props: ['id'], // id 返回数据时携带，可以直接传给指定的对象
  data () {
    return {
      imageList: []
    };
  },
  methods: {
    addImage () {
      let allowChooseNum = 3 - this.imageList.length;
      this.$wxUtils.chooseImg({num: allowChooseNum}).then(res => {
        this.imageList = _.concat(this.imageList, res.tempFilePaths);
        this.commitImageData();
      });
    },

    deleteImg (e) {
      this.imageList = _.remove(this.imageList, (item, index) => {
        return index !== e;
      });
      this.commitImageData();
    },

    commitImageData () {
      let obj = {
        id: this.id,
        imageList: this.imageList
      };

      this.$emit('imageData', obj);
    }
  }
};
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';
  $imageSize : calc((70vw - 120rpx) / 3);
  .image-appraisal-container {
    @include flex(flex-start);

    .add-image {
      width: $imageSize;
      height: $imageSize;
      margin-left: 20rpx;
      @include backgroundImg('../assets/images/add_pic.png');
    }

    .choose-image-list {
      @include flex();

      .choose-image-item {
        position: relative;
        width: $imageSize;
        height: $imageSize;
        margin-right: 20rpx;
        border-radius: 16rpx;


        &:last-child {
          margin-right: 0;
        }

        image {
          width: $imageSize;
          height: $imageSize;
          border-radius: 16rpx;
        }

        .delete-image {
          position: absolute;
          top: -16rpx;
          right: -16rpx;
          width: 32rpx;
          height: 32rpx;
          @include backgroundImg('../assets/images/delete_pic.png');
        }
      }
    }

  }
</style>
