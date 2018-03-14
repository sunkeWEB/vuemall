<template>
  <div>
    User --- {{$route.params.id}}
    <button @click="jump">跳转</button>
  </div>
</template>

<script>
  export default {
    name: "user",
    methods: {
      jump() {
        this.$router.push({name: 'user', params: {id: 100}});
      }
    },
    beforeCreate: function () {
      console.group('beforeCreate 创建前状态===============》');
      console.log(new Date());
    },
    created: function () {
      console.group('created 创建完毕状态===============》');
    },
    beforeMount: function () {
      console.group('beforeMount 挂载前状态===============》');
    },
    mounted: function () {
      console.group('mounted 挂载结束状态===============》');
    },
    beforeUpdate: function () {
      console.group('beforeUpdate 更新前状态===============》');
    },
    updated: function () {
      console.group('updated 更新完成状态===============》');
    },
    beforeDestroy: function () {
      console.group('beforeDestroy 销毁前状态===============》');
    },
    destroyed: function () {
      console.group('destroyed 销毁完成状态===============》');
    },
    beforeRouteUpdate(o, from, next) {
      console.log("beforeRouteUpdate");
      next()
    },
    beforeRouteEnter(to, from, next) {
      console.log('beforRouteEnter')
      console.log(this) // 结果为undefined，因为在执行beforRouteEnter时候，组件还没有被创建出来；先执行beforRouteEnter，再执行beforeCreate
      next((vm) => { //参数vm就是当前组件的实例。
        vm.test = '我被改变了'
      })
    },
  }
</script>

<style scoped>

</style>
