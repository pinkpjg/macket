export default {
  addCart(context, payload) {
    //1.payload新添加的商品
    // let oldProduct = null
    // for(let item of state.cartList){
    //   if(item.iid === payload.iid){
    //     oldProduct = item
    //   }
    // }
    //查找之前数组中是否有该商品
    return new Promise((resolve,reject) => {
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === payload.iid
      })
      //2.判断oldProduct
      if (oldProduct) {//商品数量加一
        context.commit('addCounter', oldProduct)
        resolve('商品数量加一')
      }
      else {//添加新的商品
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加了新的商品')
      }
    })
  }
}