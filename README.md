# 精禾大数据平台
精禾大数据平台

## 技术栈
`create-react-app`脚手架 + `React` + `React-Redux` + `Antd`

## 项目环境
1. git
2. 安装Node环境（v8版本）
3. yarn（需要设置淘宝镜像源）
> ```
> npm install -g yarn // or brew install yarn
> yarn config set registry https://registry.npm.taobao.org
> ```


## 如何安装
1. 使用`git`工具把项目克隆到指定目录
>```
> git clone https://gitee.com/zkhh/ican 
>```
2. 使用`yarn`安装
> ```
> yarn
> ```

## 如何启动
配置文件在`config/webpack.config.dev.js`;
```
yarn (run) dev
```
## 如何打包
配置文件在`config/webpack.config.js`;
```
yarn (run) build
```
打包后的文件名称叫`ican`, 如果想更换名称，更改位置在：
> `config/paths.js` - `appBuild: resolveApp('你想要的文件名称'),`

## 文件目录
主要开发的目录是`src`
```
.
├── css         // 样式文件
├── images      // 静态图片
├── index.js    // 入口文件
├── map         // 地图相关文件
├── redux       // Redux文件
├── router      // Router文件
├── url.js      // URL配置文件
└── utils       // 帮助文件
```

## 特殊说明
1. 地图的基本配置都放到`redux/init/lyrs.js`和`redux/init/map.js`中；
2. 项目大量用到`Redux`思想

## 修改远程仓库地址（可选）
```
git remote -v // 查看远程仓库地址
git remote set-url origin https://gitee.com/zkhh/ican // 修改远程仓库地址
```