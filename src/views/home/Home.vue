<template>
  <div id="home">
    <navbar class="home-nav"><div slot="center">购物街</div></navbar>
    <scroll class="content"
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import Navbar from "components/common/navbar/Navbar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import GoodsListItem from "components/content/goods/GoodsListItem";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop"

import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    Navbar,
    TabControl,
    GoodsList,
    GoodsListItem,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop:false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //请求多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");

    this.getHomeGoods("new");

    this.getHomeGoods("sell");
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick(){
      // 通过ref拿到scroll组件，再.scroll拿到scroll属性，
      // .scrollTo()是better-scroll内部的方法，里面可以传参数
      // 第一个和第二个表示x,y坐标，第三个表示毫秒
      //这里自己封装了一个scrollTo()方法，为了让代码容易看懂
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      // this.isShowBackTop = -position.y > 1000 ? true : false
      this.isShowBackTop = (-position.y) > 1000
    },
    loadMore(){
      //加载更多图片
      this.getHomeGoods(this.currentType)
      //刷新计算
      this.$refs.scroll.scroll.refresh()
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      //为了第一次就拿到第一页的数据，定义一个page常量
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //push(...数组[])把数组里面的数据解析出来一个一个放入list
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //调用BScroll里面的finishPullUp方法可以上拉加载多次
        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* vh -> viewport heigh */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* font-size: 20px; */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
}
.tab-control {
  position: sticky;
  top: 44px;
}
.content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
}
</style>