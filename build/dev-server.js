var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.conf');

//创建一个express实例
var app = express();
//调用webpack并将参数传递进去
var compiler = webpack( config );

//使用webpack-dev-middleware中间件
var devMiddleware = require('webpack-dev-middleware')(compiler,{
	publicPath:config.output.publicPath,
	stats :{
		colors:true,
		chunks:false
	}
});
// 使用 webpack-hot-middleware 中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler);

// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})


//注册中间件
app.use(devMiddleware);
// 注册中间件
app.use(hotMiddleware);

//监听8888：端口开启服务器
app.listen(8888,function(err){
	if(err){
		console.log(err);
		return false;
	}
	console.log('Listening:http://localhost:8888');
});