### 冰火koa版上传
一切以简单粗暴易用的koa上传文件、上传图片方式

### 使用指南
1、下载依赖库(koa-icefire-upload)
```
yarn add koa-icefire-upload
```
2、在koa里使用
```js
const {icefireUpload} = require('koa-icefire-upload');
router.post('/', async (ctx, next) => {
    let extendsions = ['png', 'jpeg', 'gif', 'jpg'];        // 清一色小写    允许的文件后缀
    let filePath = path.join(__dirname, 'imgs/');       // 确保目录存在，否则报错, 文件上传到此目录
    let params = await icefireUpload({ctx, extendsions, filePath});
    ctx.body = params;      // 这里就是上传的信息
});
```
3、输出案例
```
[
  {
    "fieldname": "textfield",
    "type": "text",     // 参数类型, 普通参数text，
    "val": "111"        //普通参数
  },
  {
    "fieldname": "filefield",
    "type": "file",     // 参数类型, 文件参数text，
    "errorMsg": "格式不规范"
  }
]
```
