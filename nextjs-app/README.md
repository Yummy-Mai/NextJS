1. nextJS会将不包含动态数据的页面进行预渲染
2. nextJS预渲染方式
   (1) Static Generation
       export async function getStaticProps(context){...}
   (2) Server-side Rendering


遇到的问题
1. 在index.js中导入fs模块报错Module not found
解决方式：在next.config.mjs中添加如下代码
   webpack: (config,{ isServer }) => {
       if(!isServer){
           config.resolve.fallback = {
                fs: false
           }
       }
       return config
   }