import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '@/views/GoodsList'
import Title from '@/views/Title'
import Price from '@/views/Price'
import Card from '@/views/Card'
import User from '@/views/User'
import Cart from '@/views/Cart'
import Adders from '@/views/Adders'
import Order from './../views/OrderConfirm'
import PaySuccess from './../views/Paysuccess'
Vue.use(Router)
// paysuccess
export default new Router({
  mode: 'history',
  linkActiveClass: 'router-link-active',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/goods',
      name: 'goods',
      component: GoodsList,
      children: [
        {
          path: 'title',
          name: '标题',
          component: Title
        },
        {
          path: 'price',
          name: 'price',
          component: Price
        }
      ]
    },
    {
      path: '/card',
      name: '购物车列表',
      component: Card
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }, {
      path: '/adders',
      name: 'adders',
      component: Adders
    }, {
      path: '/order',
      name: 'order',
      component: Order
    },{
    path:'/paysuccess',
      name:'paysuccess',
      component:PaySuccess
    }
  ]
})
