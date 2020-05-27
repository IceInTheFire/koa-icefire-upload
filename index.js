const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');

const icefireUpload = async ({ctx, filePath, extendsions }) => {
    // let filePath = path.join(__dirname, 'imgs/');
    // let extendsions = ['png', 'jpeg', 'gif'];          // 小写即可
    // console.log(ctx.params.like);
    const busboy = new Busboy({headers: ctx.req.headers});

    let result = await new Promise((resolve, reject) => {
        let datas = [];
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            // console.log('File [' + fieldname + ']: filename: ' + filename);
            let isTrue = false;
            file.on('data', function(data) {
                // console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
            });
            var fstream;
            if (filename !== '') {
                var extension = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase() ;
                if(extendsions.indexOf(extension) !== -1) {
                    fstream = fs.createWriteStream(filePath + '/' + filename.trim());
                    file.pipe(fstream);
                    isTrue = true;
                } else {
                    isTrue = false;
                }
            }
            file.on('end', function() {
                if(isTrue) {
                    datas.push({
                        type: 'file',
                        imgPath: `/${filePath}/${filename}`,
                        imgKey: filename,
                        fieldname,
                    });
                } else {
                    datas.push({
                        fieldname,
                        type: 'file',
                        errorMsg: filename + '格式不规范',
                    });
                }

                // console.log('File [' + fieldname + '] Finished');
            });
        });
        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
            datas.push({
                fieldname,
                type: 'text',
                val: val
            });
            // console.log('Field [' + fieldname + ']: value: ' + val);
        });
        busboy.on('finish', function() {
            // console.log('Done parsing form!');
            // res.writeHead(303, {Connection: 'close', Location: '/'});
            // res.end();
            resolve(datas);
        });
        ctx.req.pipe(busboy);
    });

    return result;
};


module.exports = {
    icefireUpload
}
