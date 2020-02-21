<template>
  <div class="welcome-class">
    <h2 v-waitForT>{{$t("appTitle")}}</h2>
    <keep-alive>
      <div class="btn-wrapper">
        <router-link class="hi" to="hello" v-waitForT>{{$t("button1")}}</router-link>
        <p>{{$t("booo")}}</p>
      </div>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// Set the parent router view.
// The parent route component is Home.vue in pages.
// Loads home.vue from here.
  export default {
    name: 'Hello',
    components: {
    },
    data: function(){
      return {}
    },
    methods: {
      _helloWorld() {
        console.log('Hello world')
      }
    },
    mounted() {
    },
    created() {
      this._helloWorld();
    }
  }
</script>

<style scoped lang="scss">
  .welcome-class {
    h2 {
      margin-top: 0;
      margin-bottom: 2em;
    }
    padding: 1em;
    background: #efefef;
    border-radius: 4px;
    font-size: 24px;
    text-align: center;
    .btn-wrapper {
      margin-bottom: 2em;
      margin-top: 16px;
      a {
        color: #fff;
        text-decoration: none;
        padding: 0.5em 2em;
        border-radius: 3px;
      }
      .hi {
        background: #6c6cd6;
      }
      .bi {
        background: #d66c87
      }
    }
  }
</style>