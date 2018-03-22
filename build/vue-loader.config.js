module.exports = (isDev) => {
    return {
        preserveWhitepace: true,
        cssModules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            camelCase: true,
        },
        // 生产环境下开启热重载
        hotReload: false,
        
    }
}