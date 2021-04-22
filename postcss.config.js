module.exports = {
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth:375,//视口的宽度，对应的使我们设计稿的宽度
      viewportHeight:667,//视口的高度，对应的使我们设计稿的高度（也可以不配置）
      unitPrecision:5,//制定‘px'转换为视口单位值的小数位数（很多时候无法整除）
      viewportUnit:'vw',//制定需要转换成的视口单位，建议使用vw
      selectorBlackList:['ignore','tab-bar','tab-bar-item'],//制定不需要转换的类
      minPixelValue:1,//小于或等于’1px‘不转换成视口单位
      mediaQuery:false,//允许在媒体查询中转换'px'
      // exclude:['TabBarItem.vue']
    },
  }
}