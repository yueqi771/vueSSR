// 服务端渲染入口文件

import createApp from './create-app';

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();

        // 给路由push一条记录
        router.push(context.url);

        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            // 根据url匹配组件
            const matchedComponents = router.getMatchedComponents();

            if(!matchedComponents.length) {
                return reject(new Error('404 not fount'))
            }

            Promise.all(matchedComponents.map(Component => {
                if(Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                context.state = store.state;
                console.log(store.state)
                resolve(app)
            }).catch(reject);
        })
    })
}
