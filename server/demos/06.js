const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>Hello World</h1>';
});

app.use(router.routes());
app.listen(3000);
console.log('server listening on 3000');
