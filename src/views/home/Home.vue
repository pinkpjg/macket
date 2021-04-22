<template>
  <div id="home">
    <navbar class="home-nav"><div slot="center">购物街</div></navbar>
    <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFixed"
      ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
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
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import {itemListenerMixin} from "common/mixin"
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
    BackTop,
  },
  mixins:[itemListenerMixin],
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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed:false,
      saveY:0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    //保存y值
    this.saveY = this.$refs.scroll.getScrollY()
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgLisner)
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");

    this.getHomeGoods("new");

    this.getHomeGoods("sell");
  },
  mounted() {
    // //监听item中图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh, 200);
    // //对监听的事件进行保存
    // this.itemImgLisner =  () => {
    //   refresh();
    // }
    // this.$bus.$on("itemImageLoad",this.itemImgLisner);
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      // 通过ref拿到scroll组件，再.scroll拿到scroll属性，
      // .scrollTo()是better-scroll内部的方法，里面可以传参数
      // 第一个和第二个表示x,y坐标，第三个表示毫秒
      //这里自己封装了一个scrollTo()方法，为了让代码容易看懂
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // this.isShowBackTop = -position.y > 1000 ? true : false
      //判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      //获取tabControl的offsetTop
      //所有的组件都有一个属性$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.$refs.tabControl.$el.offsetTop);
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
        this.$refs.scroll.finishPullUp();
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
  position: relative;
  /* padding-top: 44px; */
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* font-size: 20px; */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99; */
}
.content {
  /* height: calc(100% - 93px);
  overflow: hidden; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}
.tab-control{
  position: relative;
  z-index: 9;
}
</style>