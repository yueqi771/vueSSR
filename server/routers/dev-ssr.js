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


// 获取项目中依赖的模块
const NativeModule = require('module'); // module.exports
const vm = require('vm');

const getModuleFromString = (bundle, filename) => {
    const m = { exports: {} };

    /*
        .warp方法把执行的js代码进行包装
        `function(exports, require, module, filename, __dirname){
            ...bundle // 需要执行的代码
        }`
    */
    const wrapper = NativeModule.wrap(bundle);

    console.log(wrapper)

    // 执行wrap的代码
    const script = new vm.Script(wrapper, {
        filename: filename,
        displayErrors: true,
    })

    // 指定 在当前上下文环境下执行wrap里面的代码
    const result = script.runInThisContext();
    // 使用m.exorts作为调用者执行result代码
    // 这里require的是当前环境的node_modules, 所以可已解决存在多个mobx实例的问题
    result.call(m.exports, m.exports, require, m);
    // 最后把m, 即module.exports里面的东西赋值在m对象上
    return m;
}

const Module = module.constructor;


// 记录webpack打包出来生成的文件
let serverBundle, bundle;

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
    // bundle = mfs.readFileSync(bundlePath, 'utf-8');


    // 将读取出来的字符串转化成js可以解析的格式
    // const m = getModuleFromString(bundle, 'server-entry.js');
    // serverBundle = m.exports

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
        'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
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
