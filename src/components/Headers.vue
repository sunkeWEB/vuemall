<template>
  <header class="header">
    <symbol id="icon-cart" viewBox="0 0 30 32" style="width: 100px;height: 100px">
      <title>cart</title>
      <path class="path1"
            d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
      <path class="path2"
            d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
      <path class="path3"
            d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      <path class="path4"
            d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    </symbol>
    <div class="navbar" style="display: flex">
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src="./../../static/img/logo.jpg"></a>
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <a href="/" class="navbar-link" v-show="loginstatus">{{loginname}}</a>
          <span class="navbar-link"></span>
          <a href="javascript:void(0)" class="navbar-link" @click="mdShow=true" v-show="!loginstatus">登录</a>
          <router-link href="javascript:;" to="/cart" v-show="loginstatus">我的购物车</router-link>
          <a href="javascript:void(0)" class="navbar-link" v-show="loginstatus" @click="logout">退出</a>
          <!--<div class="navbar-cart-container">-->
          <!--<span class="navbar-cart-count"></span>-->
          <!--<a class="navbar-link navbar-cart-link" href="/#/cart">-->
          <!--<svg class="navbar-cart-logo">-->
          <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>-->
          <!--</svg>-->
          <!--</a>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <Modal v-bind:mdShow="mdShow" @close="closeModal">
      <div slot="message">
        <div class="error-wrap">
          <div slot="mdtitle" style="font-size: 20px;font-weight: 600">登录</div>
          <span class="error error-show">{{errmsg}}</span>
        </div>
        <ul>
          <li class="regi_form_input">
            <i class="icon IconPeople"></i>
            <input type="text" tabindex="1" name="loginname" class="regi_login_input" v-model="userName">
          </li>
          <li class="regi_form_input noMargin">
            <i class="icon IconPwd"></i>
            <input type="password" tabindex="1" name="password" class="regi_login_input" v-model="userPwd">
          </li>
        </ul>
      </div>

      <div slot="btngroup">
        <div class="login-wrap">
          <a class="btn-login" href="javascript:;" @click="login">登录</a>
        </div>
      </div>
    </Modal>
  </header>
</template>

<script>
  import '@/assets/css/base.css';
  import '@/assets/css/login.css';
  import Modal from './../components/modal';
  import axios from 'axios';

  export default {
    data() {
      return {
        mdShow: false,
        userName: '',
        userPwd: '',
        loginname: '',
        loginstatus: false,
        errmsg: ''
      }
    },
    mounted() {
      this.checklogins();
    },
    methods: {
      closeModal() {
        this.mdShow = false
      },
      login() {
        axios.post('/users/login', {userName: this.userName, userPwd: this.userPwd}).then(res => {
          if (res.status === 200 && res.data.code === 0) {
            console.log("sadsadas");
            this.loginname = res.data.result.userName;
            this.loginstatus = true;
            this.$store.commit('updateinfo', res.data.result.userName);
            this.userName = '';
            this.userPwd = '';
            this.errmsg = '';
            this.closeModal();
          } else {
            this.errmsg = res.data.msg
          }
        })
      },
      logout() {
        axios.post('/users/logout').then(res => {
          if (res.data.code === 0 && res.status === 200) {
            this.$store.commit('updateinfo', '');
            this.loginstatus = false;
          }
        })
      },
      checklogins() {
        axios.post('/users/checklogin').then(res => {
          let count = 0;  // 购物车商品总共数量
          if (res.status === 200 && res.data.code === 0) {
            this.$store.commit('updateinfo', res.data.result.userName)
            this.loginname = res.data.result.userName;
            this.loginstatus = true;
            res.data.result.cartList.map(v => {
              count += v.productNum
            })
          }
        })
      }
    },
    components: {
      Modal
    }
  }

</script>

<style scoped>
  .navbar {
    padding: 10px 0;
    max-width: 1260px;
    margin: 0 auto;
  }

  .navbar-right-container {
    flex: 1;
    justify-content: flex-end;
    align-items: center;
  }
</style>
