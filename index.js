const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    ctx.response.body = `<h1>Hello Koa2</h1>`;
});

app.listen(3333, ()=>{
    console.log(`[Server] starting at prot 3333`)
})