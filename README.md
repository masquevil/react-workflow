<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [React: Umi + Dva 项目](#react-umi-dva-项目)
	- [模板概述](#模板概述)
	- [目录结构](#目录结构)
		- [1、项目目录](#1项目目录)
		- [2、源码目录](#2源码目录)
	- [环境搭建](#环境搭建)
		- [开发环境](#开发环境)
		- [生产环境](#生产环境)
	- [开始开发](#开始开发)
		- [新增一个页面](#新增一个页面)
		- [加入样式文件](#加入样式文件)
		- [使用 model 做状态管理](#使用-model-做状态管理)
		- [发送 Ajax 请求](#发送-ajax-请求)
	- [代码组织](#代码组织)
		- [路由介绍](#路由介绍)
		- [页面代码组织](#页面代码组织)
		- [全局复用](#全局复用)
	- [基础功能（API）](#基础功能api)
		- [使用 react-router](#使用-react-router)
		- [index.js](#indexjs)
		- [使用 model](#使用-model)
			- [示例](#示例)
		- [使用 axios 做 Ajax](#使用-axios-做-ajax)
		- [mock 数据](#mock-数据)

<!-- /TOC -->

# React: Umi + Dva 项目

## 模板概述

首先这个 readme 我还没写完……

本模板是基于 [umi](https://umijs.org/) + [dva](https://dvajs.com/) 官方一套搭建成的 React 项目模板，理论上涵盖了我们构建一个常规项目需要的全部必备功能。

对于想要轻松上手的玩家来说，只要阅读本文档就足够了。而对于使用过多次的老玩家，想要 研究一些原理/做一些定制和优化 的，还可以去了解下面这些东西：

简单介绍一下：[umi](https://umijs.org/) 是一个以路由为基础的，可插拔的企业级 react 应用框架。[dva](https://dvajs.com/) 是一个基于 [redux](https://github.com/reduxjs/redux) 和 [redux-saga](https://github.com/redux-saga/redux-saga) 的数据流方案，同时内置了 [react-router](https://github.com/ReactTraining/react-router) 和 [fetch](https://github.com/github/fetch)。


## 目录结构

下面是对常用目录的一个介绍。如果对目录结构仍有疑问，可以看 [umi 的目录及约定](https://umijs.org/zh/guide/app-structure.html)。

### 1、项目目录

```
project
├── dist
├── mock    # 约定 mock 目录里所有的 .js 文件会被解析为 mock 文件
├── src     # 约定 src 为源码目录，但是可选，简单项目可以不加 src 这层目录
└── ……      # 其它都不重要
```

### 2、源码目录

```
src
├── app.js             # 入口文件，通常无需关注
├── global.(j|t)sx     # 在入口文件最前面被自动引入，可以考虑在此加入 polyfill
├── global.(css|less|sass|scss)       # 全局样式，可以放 css reset 之类的东西
├── assets             # 图片等资源文件
├── layouts            # 布局文件
│   └── index.js       # 如果有这个文件，则应用为全局布局
├── pages              # 页面，遵循 umi 约定
│   ├── 404.js         # 404 页面
│   └── document.ejs   # 有这个文件时，会覆盖默认的 HTML 模板
├── models             # dva 的领域模型，包含了 redux 的 state、reducers 和 redux-saga 的 effects 等
├── components         # 通用组件
├── services           # 一些服务，如异常上报等，通常应该存在内部 npm 包，这里是存放哪些未成形的服务
└── utils              # 一些工具类
```


## 环境搭建

### 开发环境

开始开发前，执行 `yarn start` 或 `npm run start`，这会启动一个本地服务器，开启热更新，并将地址自动复制到你的剪贴板。

接下来你需要：

1. 在浏览器里粘贴地址，查看页面
2. 开始开发！在编辑器里修改你的代码，保存即可在浏览器里看到效果

### 生产环境

执行 `yarn build` 或 `npm run build`，会将生产环境代码生成到你的 `dist` 目录。如果你对构建有更多的要求，可以看 [umi 配置](https://umijs.org/zh/guide/config.html)。


## 开始开发

- 以下操作默认均在页面目录下进行

### 新增一个页面

新建与 url 相对应的目录作为 **页面目录** （[路由介绍](#路由介绍)），在 **页面目录** 下新建 `index.js`。

```javascript
// index.js
import { Component } from 'react';
export default class Page extends Component {
  render() {
    return <div>Hello world!</div>;
  }
}

// 你也可以使用函数式组件作为页面
export default function() {
  return (
    <div>Hello world!</div>
  );
}
```

### 加入样式文件

新建 `index.(css|less|...)`，并在 `index.js` 中导入。

- 建议参照 `martin/index.js` 的例子，使用 [css modules](https://segmentfault.com/a/1190000010301977) 引入样式文件。

```css
/* index.css */
.welcome { font-size: 28px; color: cyan; }
```

```javascript
// index.js
import { Component } from 'react';
import styles from './index.css';

export default class Page extends Component {
  render() {
    return <div className={styles.welcome}>Hello world!</div>;
  }
}
```

### 使用 model 做状态管理

新建 `model.js` 或 `models/xxx.js`，并在 `index.js` 中 `connect` 起来。

```javascript
// model.js
export default {
  namespace: 'martin',
  state: 'Hello Martin State!',
  reducers: { ... },
  effects: { ... },
  subscriptions: { ... },
};
```

```javascript
// index.js
import { Component } from 'react';
import { connect } from 'dva';

@connect(states => ({
    martin: states.martin
}))
class Page extends Component {
  render() {
    const { dispatch, martin } = this.props;
    return <div>{ martin }</div>;
  }
}
export default Page;

// 如果是函数式组件：
export default connect(({ martin }) => ({ martin }))(Page);
```

### 发送 Ajax 请求

Ajax 请求通常在 model 的 effects 中发送。

```javascript
// model.js
import api from '@/services/api';

export default {
  // ...
  effects: {
    *fetch(action, effects) {
      const response = yield effects.call(api.get, '/api/fetch', {});
      yield effects.put({ ... });
    }
  },
};
```

## 代码组织

### 路由介绍

umi 会根据 `pages` 目录自动生成路由配置，称为“约定式路由”。举例：

- `page/users/index.js` -> `/users/`
- `page/users/list.js` -> `/users/list`
- 我们建议所有的页面都是目录下的 `index.js` 而非 `[pagename].js`

除此之外，umi 还提供了其它约定方式，以及配置式路由等支持。详见 [umi 路由](https://umijs.org/zh/guide/router.html)。

### 页面代码组织

1. **页面目录** 是与 url 相对应的目录（[路由介绍](#路由介绍)）
2. `index.js` 暴露页面的函数
3. `index.(css|less|...)` 存放样式文件
4. `model.js` 或 `models/xxx.js` 做状态管理（Redux）
5. `components/` 可复用的组件
6. `services/` 插件、可复用的服务
7. `utils/` 简单可复用的工具类

### 全局复用

将全局复用的功能，提取到 `src` 根目录下，包括：

- `/src/global.(js|jsx|tsx)`
- `/src/global.(css|less|...)`
- `/src/models/`
- `/src/components/`
- `/src/services/`
- `/src/utils/`


## 基础功能（API）

### 使用 react-router

API 文档：[umi 路由](https://umijs.org/zh/api/#%E8%B7%AF%E7%94%B1)

```javascript
/* 声明式 */
import Link from 'umi/link';
export default () => (
  <Link to="/list">Go to list page</Link>
);

/* 命令式 */
import router from 'umi/router';
function goToListPage() {
  router.push('/list');
}
```

### index.js

页面的入口，`export default` 返回页面组件。

```javascript
import { Component } from 'react';
class Page extends Component {
  render() {
    return <div>Hello world!</div>;
  }
}
export default Page;
```

`this.props` 包含以下字段：

1. `dispatch`：redux 的 dispatch
2. 暂时还不知道用不用得到这些字段：`route` `match` `location` `history` `computedMatch` `children` `staticContext`

### 使用 model

[dva model](https://dvajs.com/guide/concepts.html#models) 是 dva 提供的基于 [redux](https://github.com/reduxjs/redux) 和 [redux-saga](https://github.com/redux-saga/redux-saga) 的数据流方案，详细介绍请看 [Dva 概念](https://dvajs.com/guide/concepts.html)。

dva 的数据流：数据的改变发生通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，当此类行为会改变数据的时候可以通过 dispatch 发起一个 action，如果是同步行为会直接通过 Reducers 改变 State ，如果是异步行为（副作用）会先触发 Effects 然后流向 Reducers 最终改变 State。可以看出就是很纯粹的单向数据流。

一个 model 包含以下几个字段：

1. `namespace`
    - 表示在全局 state 上的 key
    - 按照 umi 的[官方说明](https://umijs.org/zh/guide/with-dva.html#model-%E6%B3%A8%E5%86%8C)，model 会被自动注册
    - 由于一个 bug: [issues#1483](https://github.com/umijs/umi/issues/1483)，本字段不能省略
    - 另一方面，为了避免命名冲突和混淆，本字段也不建议省略
2. `state`
    - 表示 model 的状态数据，是全局 state 的一个片段
    - 对应 redux 的 state
    - 可以是任何数据类型，通常表现为一个 js 对象
    - 不要将所有的数据都放到 state 里，只放会被修改的数据
3. `reducers`
    - 修改 state 的唯一方式，但不直接修改 states，必须是纯函数
    - `type Reducer<S, A> = (state: S, action: A) => S`
    - 对应 redux 的 reducers
    - 通过 actions 中传入的值，结合现在的 state 计算出新的值，返回新的 state
4. `effects`
    - 被称为副作用，最常见的就是异步操作
    - 之所以叫副作用是因为它使得我们的函数变得不纯，同样的输入不一定获得同样的输出
    - 格式为 `*(action, effects) => void` 或 `[*(action, effects) => void, { type }]`。
    - 对应 [redux-saga](http://superraytin.github.io/redux-saga-in-chinese)，将异步转成同步写法，从而将 effects 转为纯函数
    - 例子可以看 [dva 测试用例](https://github.com/dvajs/dva/blob/master/packages/dva-core/test/effects.test.js) 和 [redux-saga api](https://redux-saga-in-chinese.js.org/docs/api/)
5. `subscriptions`
    - 一种从 源 获取数据的方法，它来自于 elm
    - 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要的 action。
    - 数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。

除了这些字段外，你可能还需要了解一些 [redux](https://redux.js.org/) 概念，补充上述字段没有描述的部分：

1. `actions`
    - 一个普通 javascript 对象，通过 dispatch 函数调用一个 action，是改变 State 的唯一途径
    - `type AsyncAction = any`
    - action 必须带有 type 属性指明具体的行为，其它字段可以自定义
    - 对应 [redux 的 actions](https://redux.js.org/basics/actions)
    - 要发起一个 action 需要使用 dispatch 函数
2. `dispatch`
    - 用于触发 action 的函数，action 只描述了一个行为，而 dipatch 可以看作是触发这个行为的方式
    - `type dispatch = (a: Action) => Action`
    - 对应 [redux 的 dispatch](https://redux.js.org/basics/store#dispatching-actions)
    - connect Model 的组件通过 props 可以访问到 dispatch
3. actions、dispatch、reducer 的关系
    - action 只描述了一个行为，而 dipatch 可以看作是触发这个行为的方式，而 Reducer 则是描述如何改变数据的

#### 示例

```javascript
// martin/model.js
import request from 'some Ajax library';    // 用来展示 effects
import key from 'keymaster';                // 用来展示 subscriptions
export default {
  namespace: 'martin',
  state: {
    data: []
  },
  reducers: {
    push(state, { data: data }) {
      return state.data.concat(data);
    },
    up(state) {
      return state.data.map(value => value + 1);
    },
  },
  effects: {
    *remotePush(action, { put, call }) {
      const data = yield call(request, '/api/url', 'param', 'param');
      yield put({ type: 'push', data: data });
    },
  },
  subscriptions: {
    keyEvent({dispatch}) {
      key('⌘+up, ctrl+up', () => { dispatch({ type: 'up' }); });
    },
  },
};

// martin/index.js
@connect((state) => ({
  martin: state.martin
}))
class Page extends React.Component {
  render() {
    const { dispatch, martin } = this.props;
    return (
      <div>
        <div>{ martin.data.toString() }</div>
        <button onClick={ e => { this.push(); } }>Push</button>
      </div>
    );
  }

  push(){
    this.props.dispatch({ type: 'martin/push', data: Math.random() });
  }
}
export default Page;
```

### 使用 axios 做 Ajax

使用请参考 [axios api](https://www.npmjs.com/package/axios#axios-api)。对 axios 的初始化配置请在 `/src/services/api.js` 下进行。

```javascript
// /src/services/api.js
const apiService = axios.create({
  baseURL: 'https://demo.com/api/',
  header: {
    Soulran: 'handsome',
  },
});
```

### mock 数据

umi 里约定 `mock` 文件夹下的 `.js` 文件即 mock 文件。详细介绍可以看 [umi mock](https://umijs.org/zh/guide/mock-data.html)。下面是一个简单的例子：

```js
export default {
  'GET /api/users': { users: [1, 2] },
  '/api/users/1': { id: 1 },
  'POST /api/users/create': (req, res) => { res.end('OK'); },
};
```
