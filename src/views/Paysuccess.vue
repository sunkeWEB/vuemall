<template>
  <div>
    <nav-header/>
    <nav-bread>
      <span slot="two">支付详情</span>
    </nav-bread>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>支付详情</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>选择</span> 地址</li>
          <li class="cur"><span>订单</span> 详情</li>
          <li class="cur"><span>确认</span> 支付</li>
          <li class="cur"><span>支付</span> 信息</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic">
          <img src="static/img/ok-2.png" alt="">
        </div>
        <div class="order-create-main">
          <h3>恭喜!<br>您的订单正在处理中!</h3>
          <p>
            <span>订单号: {{orderid}}</span>
            <span>交易金额: {{totalprice | currency('￥')}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link to="/cart" class="btn btn--m">购物车</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link to="/" class="btn btn--m">继续购物</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer/>
  </div>
</template>

<script>
  import NavHeader from './../components/Headers';
  import NavFooter from './../components/Footer';
  import NavBread from './../components/Bread';
  import axios from 'axios';
  import {currency} from './../utils/currery'

  export default {
    data() {
      return {
        orderid: '',
        totalprice: 0
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let orderid = this.$route.query.orderid;
        if (!orderid) {
          alert("参数错误");
          return false;
        }
        axios.get('/users/getorder', {params: {orderid: orderid}}).then(res => {
          if (res.status === 200 && res.data.code === 0) {
            this.orderid = res.data.result[0].orderid;
            this.totalprice = res.data.result[0].totalPrice;
          } else {
            alert("没有获取到相关的信息");
          }
        });
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread
    },
    filters: {
      currency: currency
    }
  }
</script>

<style scoped>

</style>
