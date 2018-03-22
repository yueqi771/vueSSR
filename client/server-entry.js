// 服务端渲染入口文件

import createApp from './create-app';

// const { app, router, store } = createApp();

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router } = createApp();

        // 给路由push一条记录
        router.push(context.url);

        // 路由被推进去之后，所有异步操作完成之后执行
        router.onReady(() => {
            // 根据url匹配组件
            const matchedComponents = router.getMatchedComponents();

            if(!matchedComponents.length) {
                return reject(new Error('404 not fount'))
            }
            resolve(app);
        })
    })
}
