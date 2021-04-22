<template>
<div class="cart">
  <!-- 导航 -->
  <navbar class="nav-bar">
    <div slot="center">购物车({{length}})</div>
  </navbar>
  <!-- 商品的列表 -->
  <cart-list></cart-list>
  <!-- 底部汇总 -->
  <cart-bottom-bar></cart-bottom-bar>
</div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar"
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"

import { mapGetters } from 'vuex'
export default {
  name:'Cart',
  components:{
    Navbar,
    CartList,
    CartBottomBar
  },
  computed:{
    // mapGetters辅助函数仅仅是将store中的getters映射到局部计算属性内
    //第一种语法
    // ...mapGetters(['cartLength'])
    //第二种语法
    ...mapGetters({
      length:'cartLength'
    })
  }
}
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>