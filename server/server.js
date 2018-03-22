const Koa = require('koa');

const pageRouter = require('./routers/dev-ssr')

const app = new Koa();

const isDev = process.env.NODE_ENV === 'development';

app.use((ctx, next) => {
    try {
        console.log(`request with path ${ctx.path}`)
        next()
    }catch (err) {
        console.log(err)
        ctx.status = 500;
        if (isDev) {
            ctx.body = err.message;
        }else{
            ctx.body = 'please try again later'
        }
    }
})
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PROP || 3333;

app.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
})