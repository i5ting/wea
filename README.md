# sp-ejs

- 如果public有，那么public优先
- 如无，走中间件（views目录下的），支持各种tpl和precompile
- 如果中间件（views目录下的）亦无，交给路由处理

区分

- 开发
- 编译

都是编译，然后写入浏览器和文件的差别

require('xxx')(base).write('xxx')

require('xxx')(base).koa(ctx,next)