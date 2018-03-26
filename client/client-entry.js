import createApp from './create-app';

const { app, router, store } = createApp();

if(window.__INITIAL__STATE__){
    store.replaceState(window.__INITIAL__STATE__)
}
router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);

        let diffed = false;
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })

        if(!activated.length) {
            return next();
        }

        // 触发加载
        Promise.all(activated.map(c => {
            if(c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {
            // 停止loading
            next()
        }).catch(next)
    })
    app.$mount('#root');
})
