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
    let extendsions = ['png', 'jpeg', 'gif'];       // 只允许这几个后缀上传
    let filePath = path.join(__dirname, 'imgs/');   // 上传到当前目录的imgs文件夹下
    let params = await icefireUpload({ctx, extendsions, filePath});
    ctx.body = params;      // 这里就是上传的信息
});
```
3、输出案例
```
[
  {
    "fieldname": "textfield",
    "type": "text",
    "val": "111"        //普通参数
  },
  {
    "fieldname": "filefield",
    "type": "file",
    "errorMsg": "格式不规范"
  }
]
```
