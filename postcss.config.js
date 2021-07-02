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
      exclude:[/TabBar/]
    },
  }
}

//1.在js中使用正则表达式：用//把正则相关规则包起来
//2.exclude中存放的元素必须是正则表达式
//3.按照排除的文件写对应的正则:
//正则的规则：
//^abc:表示匹配的内容，必须以什么内容开头（以abc为开头）
//abc$:表示匹配的内容，必须以什么内容结尾（以adc结尾）
