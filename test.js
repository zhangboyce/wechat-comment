var fs = require('fs'), request = require('request');

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

download('http://mmbiz.qpic.cn/mmbiz_jpg/kOOic3Fr6rohw2PiaSg697Br5O4wo2qMYSt775YlGubSD8k4L6gny6dKWtWNRR2vwibicezkib6QQWiaHQO7ibyAibWSLg/0?wx_fmt=jpeg', 'google.png', function(){
    console.log('done');
});