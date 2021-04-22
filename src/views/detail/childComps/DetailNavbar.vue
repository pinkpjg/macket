<template>
  <div>
    <navbar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/detail/back.png" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
         :key="index" 
         class="title-item"
         :class="{active: index === currentIndex}"
         @click="titleClick(index)"
         >{{item}}</div>
      </div>
    </navbar>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
export default {
  name: "DetailNavbar",
  components: {
    Navbar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },
  methods: {
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.go(-1)
    }
  },
};
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back{
    padding: 5px 10px;
  }
  .back img{
      width: 20px;
      height: 20px;
  }
</style>