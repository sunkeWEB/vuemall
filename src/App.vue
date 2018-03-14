<template>
  <div id="app">
    <router-view/>
    <router-view class="left" name="title" />
    <router-view class="right" name="price" />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
</style>
