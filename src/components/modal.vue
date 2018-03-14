<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div slot="mdtitle"></div>
          <button class="md-close" @click="closesun">关闭</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <div class="btn-wrap">
            <slot name="btngroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdShow" @click="closesun"></div>
  </div>
</template>

<script>
  import '@/assets/css/login.css'
  export default {
    props: ['mdShow'],
    name: "modal",
    methods: {
      closesun() {
        this.$emit('close');
      }
    }
  }
</script>

<style scoped>

</style>
