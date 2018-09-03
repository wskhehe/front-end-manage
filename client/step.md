### webpack 配置@映射

### npm install --save redux

### npm install --save react-redux

### npm install --save react-router-dom

### npm install --save react-router-redux

### npm install redux-thunk --save

异步提交 store action

### npm install prop-types --save

prop 类型验证

```
static propTypes = {
    proData: PropTypes.object.isRequired,
    getProData: PropTypes.func.isRequired,
    togSelectPro: PropTypes.func.isRequired,
    editPro: PropTypes.func.isRequired,
  }
```

### npm install babel-plugin-transform-decorators-legacy --save

装饰器写法
.balerrc

```
{
    "plugins": ["transform-decorators-legacy"]
}
```

### npm install --save redux-devtools-extension

安装 redux-devtool 浏览器插件
安装依赖包

### npm install antd

### npm install babel-plugin-import -save

安装 antd 并且安装按需加载插件
并在.balerrc 添加配置

```
"plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "style": "css"
      }
    ],
    "transform-decorators-legacy"
  ]
```

### npm install less-loader less

安装 less-loader 和 less
根目录添加 theme.js 用于配置 antd 主题

修改 webpack dev 和 prod 配置
css-loader 添加 less 配置

```
test: /\.(css|less)$/
下方放在postcss-loader之后
{
loader: require.resolve('less-loader'), // compiles Less to CSS
    options: {
        // modifyVars修改主题
        modifyVars: require(path.join(__dirname, '../theme.js')),
        javascriptEnabled: true
    }
}
文件类型添加less
exclude: [/\.html$/, /\.(js|jsx)$/, /\.(css|less)$/, /\.json$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/]
```

### npm install axios -save

### 关闭 eslint 校验

修改 webpack dev 和 prod 配置

```
use: [
  // {
  //   options: {
  //     formatter: eslintFormatter,
  //     eslintPath: require.resolve('eslint')
  //   },
  //   loader: require.resolve('eslint-loader')
  // }
],
```
