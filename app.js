const Koa = require('koa');
const templating = require('./templating');
const bodyParser = require('koa-bodyparser');
const staticFiles = require('./static-files');
const isProduction = process.env.NODE_ENV === 'production';
const controller = require('./controller');
const app = new Koa();
// log request URL:
app.use(async (ctx, next) => {
    console.log(`process ${ctx.request.method} url:${ctx.request.url}`);
    var 
        start  = new Date().getTime(),
        exectTime;
    await next();
    exectTime = new Date().getTime()-start;
    console.log('time exect:',exectTime);
});

// static file support:
if (! isProduction) {
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
