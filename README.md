# 🤖 前端代码 no-code 🌈

很多前端同学，每日不仅要忙于内卷，还要忙于奔波在重复的业务逻辑期间，所以我们索性开发了这样一款工具，帮助大家可以直接根据接口生成 CURD 的全部代码，让大家生活多些快乐，功能 todolist：

> - 根据接口生成 ts 的接口声明文档
> - 根据接口直接生成 Vue+TS(js 代码)
> - 根据接口直接生成 React+TS(js 代码)
> - 定制选择指定 UI 组件库，直接根据接口生成
> - 将 JavaScript 代码直接生成 TypeScript 代码

<img src="./assets/logo.png" alt="logo" style="zoom:20%;" />

---

## 目录

- [🤖 前端代码 no-code 🌈](#-前端代码-no-code-)
  - [目录](#目录)
  - [开始](#开始)
    - [安装](#安装)
    - [基础命令](#基础命令)
    - [`envir2code`](#envir2code)
      - [例子 🌰](#例子-)
    - [`api2code`](#api2code)
      - [参数](#参数)
      - [例子 🌰](#例子--1)
    - [`react2code`](#react2code)
      - [参数](#参数-1)
      - [例子 🌰](#例子--2)
    - [`vue2code`](#vue2code)
      - [参数](#参数-2)
      - [例子 🌰](#例子--3)

## 开始

### 安装
```bash
npm install fe-code
```

### 基础命令

```shell
#查看版本号
fe-code -V
#查看帮助文档
fe-code --help
#接口生成TS代码帮助文档
fe-code api2code --help
```

### `envir2code`
描述：初始化基于(`webpack`/`vite`/`snowpack`)的`vue`/`react`脚手架

缩写: `e2c`

#### 例子 🌰

```bash
fe-code envir2code

# or 简写
fe-code e2c
```


### `api2code`
描述：通过自定义结构或openAPI的json生成crud代码
缩写：`a2c`

#### 参数

```bash
Options:
  -i, --input <input>    （可选）输入的json路径
  -o, --output <output>  （必填）输出interface的文件路径
  -h, --help              查看帮助
```

#### 例子 🌰
1. 通过本地 json 方式生成 interface
   ```bash
   fe-code a2c -o src/index.ts -i /data.json
   ```
2. 通过自定义json或openAPI生成 crud代码
    ```bash
    fe-code a2c -i ./mocks/apiConfig.json -o api/
    ```
    > 示例json在项目目录`mocks/apiConfig.json`中。

### `react2code`
描述：生成react组件代码

缩写: `r2c`

#### 参数

```bash
Options:
  -o, --output <output>  （必填）输出 react crud 模板代码的文件路径
  -h, --help              查看帮助
```

#### 例子 🌰

> 1. 生成代码默认请求为 mock json(该目录需要映射到根目录 /mock，否则将影响展示), 请求这块的处理请结合实际情况自行修改；
> 2. 生成代码字段属性是为了显示各种表单展示类型，这里为模拟字段，请根据实际情况自行配置；

```bash
fe-code react2code -o crud-demo

# or 简写
fe-code r2c -o crud-demo
```

### `vue2code`

缩写: `v2c`

#### 参数

```bash
Options:
  -o, --output <output>  （必填）输出 react crud 模板代码的文件路径
  -h, --help              查看帮助
```

#### 例子 🌰

```bash
fe-code vue2code -o crud-demo

# or 简写
fe-code v2c -o crud-demo
```
