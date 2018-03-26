# About
一个使用nodeJs做中间键搭建的服务端渲染项目

# 使用方法
```
	npm install 安装依赖
	npm run dev 进入开发环境
	npm start 开启node服务，进入生产环境
```

# 构建思路
```
	1. 使用koa开启一个nodeJs服务
	2. 开发环境下，在node端引入webpack.server.config, 使node端即时编译vue代码, 并将输出文件放到memoryFS中（可以加快读取速度）
	   vueServerRender 会打包出来一个vue-ssr-server-bundle的json文件和vue-ssr-client-manifest的json文件， 在服务端读取这两个文件，并且通过vueServerRender的renderToString给客户端返回一段html。
	3. 生产环境下，直接拿到打包出来的vue-ssr-server-bundle.json, 使用VueServerRender的createBundleRenderer方法创建一个对象, 
	   生成一个html通过ajax给客户端返回。
	4. 使用PM2来管理node进程。


