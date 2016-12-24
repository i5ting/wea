# wea

实现类似于webapps目录的就地预览的views

## Features

- 支持插件写法

## 为啥要写这个？

类似的技术选型，harp和express-generator使用的中间件，harp很方便，但不灵活，而express-generator的插件无法在Koa 2.x上使用。

- 如果public有，那么public优先
- 如无，走中间件（views目录下的），支持各种tpl和precompile
- 如果中间件（views目录下的）亦无，交给路由处理

区分

- 开发
- 编译

都是编译，然后写入浏览器和文件的差别

```
require('xxx')(base, url).build('xxx')

require('xxx')(base).koa(ctx,next)
```

## 开发模式

- webapps
  - 预览（开发模式）
  - 就地编译
  - 分离view和public
- work 执行目录