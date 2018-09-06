<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>

    <span class="home" @click="goHome">去往首页</span>
  </div>
</template>

<script>

// Use Vuex
export default {
  computed: {
    count () {
      return 1;
    }
  },
  methods: {
    increment () {
    },
    decrement () {
    },

    goHome () {
      this.$router.push({path: '/pages/teacher/index', isTab: true});
    }
  }
};
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
