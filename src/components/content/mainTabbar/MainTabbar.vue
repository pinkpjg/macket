<template>
  <tabbar>
      <tabbar-item path="/home" >
        <img slot="item-icon" src="~assets/img/home/home1.png" alt="" />
        <img slot="item-icon-active" src="~assets/img/home/home2.png" alt="">
        <div slot="item-text">首页</div>
      </tabbar-item>
      <tabbar-item path="/category"> 
        <img slot="item-icon" src="~assets/img/category/category1.png" alt="" />
        <img slot="item-icon-active" src="~assets/img/category/category2.png" alt="">
        <div slot="item-text">分类</div>
      </tabbar-item>
      <tabbar-item path="/cart">
        <img slot="item-icon" src="~assets/img/cart/shopcar1.png" alt="" />
        <img slot="item-icon-active" src="~assets/img/cart/shopcar2.png" alt="">
        <div slot="item-text">购物车</div>
      </tabbar-item>
      <tabbar-item path="/profile">
        <img slot="item-icon" src="~assets/img/profile/profile1.png" alt="" />
        <img slot="item-icon-active" src="~assets/img/profile/profile2.png" alt="">
        <div slot="item-text">我的</div>
      </tabbar-item>
    </tabbar>
</template>

<script>
import Tabbar from 'components/common/tabbar/Tabbar'
import TabbarItem from 'components/common/tabbar/TabbarItem'
export default {
  name:'MainTabbar',
  components:{
    Tabbar,
    TabbarItem 
  }
}
</script>

<style>

</style>