/*  服务端渲染代码 */
const ejs = require('ejs');
const serialize = require('serialize-javascript');

module.exports = async (ctx, renderer, template) => {
    ctx.headers['ContentType'] = 'text/html';

    const context = { url: ctx.path };

    try {

        const appString = await renderer.renderToString(context);
        const html = ejs.render(template, {
            appString: appString,
            style: context.renderStyles(),
            scripts: context.renderScripts(),
            initialState: serialize(context.state),
        })


        ctx.body = html;

    } catch(err) {
        console.log(err);
        throw err
    }
}
