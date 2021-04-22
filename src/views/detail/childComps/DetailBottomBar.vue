<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service">
          <img src="~assets/img/detail/service.png" alt="">
        </i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop">
          <img src="~assets/img/detail/shop.png" alt="">
        </i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select">
          <img src="~assets/img/detail/select.png" alt="">
        </i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
    <!-- <sport-ball ref="ball" class="sport-ball"></sport-ball> -->
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addToCart(){
      this.$emit('addCart')
    }
  },
}
</script>

<style scoped>
  .bottom-bar{
    height: 50px;
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    text-align: center;
  }
  .bar-item{
    flex: 1;
    display: flex;
  }
  .bar-item>div{
    flex: 1;
  }
  .bar-left .text{
    font-size: 13px;
  }
  .bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 3px auto 3px;
  }
  img{
    width: 20px;
    height: 20px;
  }
  .bar-right{
    font-size: 14px;
    color:#fff;
    line-height: 58px;
  }
  .bar-right .cart{
    background-color: #ffe817;
    color: #333;
  }
  .bar-right .buy{
    background-color: #f69;
  }
  /* .sport-ball{
    position: absolute;
    left: 225;
    bottom: 20px;
  } */
</style>