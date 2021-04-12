<template>
  <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name:'Tabbar'
}
</script>

<style>
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    box-shadow: 0 -3px 1px rgba(0,0,0, .2);
    font-size: 14px;
  }
 
</style>