<template>
  <div>
    <web-header/>
    <nav-bread>
      <span slot="two">商品列表</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">排序:</span>
          <a href="javascript:void(0)" class="default" :class="{'cur':sort==='default'}"
             @click="sortPriceFilter('default')">默认</a>
          <a href="javascript:void(0)" class="price" @click="sortPriceFilter" :class="{'cur':sort!='default'}">价格
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" @click="filterShow" class="filterby stopPop">过滤</a>
        </div>
        <div class="accessory-result">

          <!-- filter -->
          <div class="filter stopPop" :class="{'filterby-show':filterShows}" id="filter">
            <dl class="filter-price">
              <dt>价格:</dt>
              <dd><a href="javascript:void(0)" @click="priceFilterFun('all')"
                     :class="{'cur':priceChecked==='all'}">所有</a></dd>
              <dd v-for="(item,index) in priceFilter" @click="priceFilterFun(index)">
                <a href="javascript:void(0)" :class="{'cur':priceChecked===index}">{{item.startPrice}} -
                  {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodslist">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/img/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area" @click="addcart(item.productId)">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                   infinite-scroll-distance="30">
                <img src="./../assets/loading-spin.svg" alt="" v-show="loading">
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="filterShow"></div>
    <nav-footer/>
    <Modal v-bind:mdShow="mdShow" @close="closeModal">
      <p slot="message">请先登录，才能加入到购物车</p>
      <div slot="btngroup">
        <a href="javascript:;" class="btn btn--m" @click="closeModal">关闭</a>
      </div>
    </Modal>

    <Modal v-bind:mdShow="addcartMdShow" @close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功</span>
      </p>
      <div slot="btngroup">
        <a href="javascript:;" class="btn btn--m" @click="closeModal">继续购物</a>
        <router-link href="javascript:;" class="btn btn--m" to="/cart">查看购物车</router-link>
      </div>
    </Modal>

  </div>
</template>

<script>
  import '@/assets/css/base.css'
  import '@/assets/css/product.css'
  import WebHeader from '@/components/Headers'
  import NavFooter from '@/components/Footer'
  import NavBread from '@/components/Bread'
  import axios from 'axios'
  import Modal from './../components/modal'

  export default {
    components: {
      WebHeader,
      NavFooter,
      NavBread,
      Modal
    },
    data() {
      return {
        priceFilter: [
          {startPrice: 0.00, endPrice: 500.00},
          {startPrice: 500.00, endPrice: 1000.00},
          {startPrice: 1000.00, endPrice: 2000.00},
          {startPrice: 2000.00, endPrice: 2500.00},
          {startPrice: 2500.00, endPrice: 10000.00},
        ],
        goodslist: [],
        priceChecked: 'all',
        filterShows: false, // 手机端的价格过滤显示或隐藏
        overLayFlag: false, // 手机端的遮罩过滤显示或隐藏
        page: 1, // 默认第一页
        pageSize: 8,
        sort: 'default',
        busy: true,
        mdShow: false,
        startprice: 'all',
        endprice: 'all',
        loading: false,
        addcartMdShow:false
      }
    },
    methods: {
      priceFilterFun(index) {
        this.page = 1
        if (index === 'all') {
          this.startprice = 'all'
          this.endprice = 'all'
        }
        else {
          this.priceChecked = index
          this.startprice = this.priceFilter[index].startPrice
          this.endprice = this.priceFilter[index].endPrice
        }
        this.getGoodsList();
        this.filterShow(false) // 这里是点击手机端选中价格的时候关掉
      },
      filterShow(bol = true) {  // 手机端的价格过滤和遮罩显示隐藏 默认true是和pc端点击事件  false手机端点击事件
        this.filterShows = bol ? !this.filterShows : false
        this.overLayFlag = bol ? !this.overLayFlag : false
      },
      getGoodsList(flag = false) {
        let params = {
          pageSize: this.pageSize,
          page: this.page,
          sort: this.sort
        }
        params = {...params, startprice: this.startprice, endprice: this.endprice}
        this.loading = true;
        axios.get('/goods/list', {
          params
        }).then(res => {
          if (flag) {
            this.goodslist = [...this.goodslist, ...res.data.result.data]
            if (res.data.result.data.length >= this.pageSize) {
              this.busy = false
            } else {
              this.busy = true
            }
          } else {
            this.goodslist = res.data.result.data;
            if (res.data.result.data.length >= this.pageSize) {
              this.busy = false
            } else {
              this.busy = true
            }
          }
          this.loading = false;
        })
      },
      sortPriceFilter(key = 'num') {
        if (key === 'default') {
          this.sort = 'default'
        } else {
          if (this.sort != 'default') {
            this.sort = this.sort === 1 ? -1 : 1
          } else {
            this.sort = 1
          }
        }
        this.page = 1
        this.getGoodsList()
      },
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
        }, 100);
      },
      addcart(productId) {
        if (!this.$store.state.nickname) {
          this.mdShow = true;
          return false;
        }
        axios.post('/goods/addcart', {productId}).then((res) => {
          if (res.status === 200 && res.data.code === 0) {
            this.addcartMdShow = true;
            this.$store.commit('updatecount', +1);
          }
        })
      },
      closeModal() {
        this.mdShow = false;
        this.addcartMdShow = false
      }
    },
    mounted() {
      this.getGoodsList();
    }
  }
</script>
<style scoped>
  .load-more {
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
</style>
