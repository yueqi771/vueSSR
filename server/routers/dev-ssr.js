const Router = require('koa-router');
const axios = require('axios');
// 将输出文件存放到内存中，但是不会写入磁盘，减少读取时间，增加运行效率
const MemoryFS = require('memory-fs');
const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const VueServerRenderer = require('vue-server-renderer');

const serverRender = require('./server-render')
// 在node端运行webpack的serverConfig
const serverConfig = require('../../build/webpack.config.server');

// node端即时编译vue代码
const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFS();
// servercompiler输出文件在mfs里面
serverCompiler.outputFileSystem = mfs;

// 记录webpack打包出来生成的文件
let bundle; 

serverCompiler.watch({}, (err, stats) => {
    if(err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err));
    stats.warnings.forEach(warn => console.log(warn));

    const bundlePath = path.join(
        serverConfig.output.path,
        'vue-ssr-server-bundle.json'
    )

    // 读取打包出来的js代码（字符串）
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
    console.log(bundlePath)

    console.log('正在重新打包中....')
})

// 给客户端返回html的代码
const handlesSSR = async (ctx) => {
    if(!bundle) {
        ctx.body = 'node正在编译中, 请稍后';
        return
    }

    // 读取客户端的模板文件
    const template = fs.readFileSync(
        path.join(__dirname, '../server.template.ejs'),
        'utf-8'
    )

    // 拿到客户端打包出来的js的路径
    const clientManifestResp = await axios.get(
        'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
    )
    const clientManifest = clientManifestResp.data

    // 生成一个可以直接调用render的function
    const renderer = VueServerRenderer.createBundleRenderer(bundle, {
        inject: false,
        clientManifest
    })

    await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handlesSSR)

module.exports = router