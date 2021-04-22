<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check-button img{
    width: 20px;
    height: 20px;
  }
  .check{
    background-color: red;
    border: red;
  }
</style>