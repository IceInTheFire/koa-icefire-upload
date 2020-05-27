var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();
const {icefireUpload} = require('../index');
const path = require('path');

app.use(router.routes()).use(router.allowedMethods());

router.get('/', (ctx, next) => {
    ctx.body = `<html><head></head><body>\
               <form method="POST" enctype="multipart/form-data">\
                <input type="text" name="textfield"><br />\
                <input type="file" name="filefield"><br />\
                <input type="submit">\
              </form>\
            </body></html>`;
});
router.post('/', async (ctx, next) => {

    let extendsions = ['png', 'jpeg', 'gif', 'jpg'];        // 清一色小写
    let filePath = path.join(__dirname, 'imgs/');       // 确保目录存在，否则报错
    let params = await icefireUpload({ctx, extendsions, filePath});
    ctx.body = params;
});

app.listen(3000, () => {
    console.log('server is running');
});
