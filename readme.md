# 什么是Deno

Deno是新一代的 JavaScript 和 TypeScript 运行时（runtime），使用 [Rust](https://www.rust-lang.org/) 实现，和 Node.js 一样内部也使用 [V8](https://v8.dev/) 引擎，而且Deno 和 Node.js 的作者是同一个人：[Ryan Dahl](https://github.com/ry)。他创造Deno的初衷是为了弥补 Node.js 的某些设计缺陷，但鉴于目前Node的生态已经如此繁荣，Deno暂时还无法完全取代Node，Node还将长期稳定存在。

Deno的主要特点有：

1. 安全性：默认没有文件、网络、系统环境的访问权限，除非明确启用。与之相比，Node.js是不安全的。

1. 天生支持TypeScript

1. 实现了部分的标准Web APIs，比如：[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)、[Console API](https://developer.mozilla.org/en-US/docs/Web/API/Console)等，对前端人员友好

1. 官网提供一个包含很多常用功能的标准库，摆脱对一些第三方库的依赖

1. 使用ES6的模块系统（Node.js 使用的是CommonJS模块系统）

1. 依赖可通过远程获取，无需安装到本地

<!-- 1. 只生成一个可执行文件 -->
<!-- 1. 内置工具程序，比如依赖检查器、代码格式化程序 -->

Deno目前还处于早期发展阶段，所以一些功能和API可能还会有变动，同时生态也并不完善，社区提供的工具或多或少会有bug，但是这些都是正常的，并不妨碍我们去提前学习和了解这个更优秀的 Node.js 替代品。

# 安装Deno

**Shell (Mac, Linux) - 指定版本（推荐）:**

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.2.1
```

**PowerShell (Windows) - 指定版本（推荐）:**

```sh
$v="1.2.1"; iwr https://deno.land/x/install/install.ps1 -useb | iex
```

**Homebrew (Mac) :**

```sh
brew install deno
```

**Chocolatey (Windows) :**

```sh
choco install deno
```

> 注意：安装完成后需根据命令行中的提示配置环境变量！

在命令行里面输入 `deno` 命令就可以进入编程模式：

![deno command](http://lc-3Cv4Lgro.cn-n1.lcfile.com/71f852eafd8111733017/deno.jpg)

使用 `deno --version` 查看Deno的版本：

![deno version](http://lc-3Cv4Lgro.cn-n1.lcfile.com/a5d2e7ca8d2d841e2159/v.jpg)

## 运行JS、TS文件

可以使用 `deno run <filename.js>` 运行一个本地js文件。

![run js](http://lc-3Cv4Lgro.cn-n1.lcfile.com/9874be70e175dde77b02/run%20js.jpg)

或者，一个 ts 文件：

![run ts](http://lc-3Cv4Lgro.cn-n1.lcfile.com/a092f8e9ef8f255c874c/run%20ts.jpg)

> 第一次运行 ts 文件会进行编译，第二次就不用编译了，除非 ts 文件有修改。

Deno甚至可以运行一个远程的TS文件：

![remote ts](http://lc-3Cv4Lgro.cn-n1.lcfile.com/60752db01d0d915ba402/remote%20ts.jpg)

> 上图文件路径：http://lc-3Cv4Lgro.cn-n1.lcfile.com/0a5a6a6d71aaa2f69a6b/greet.ts

可以看到，deno会先下载远程ts文件，再编译、运行。如果该远程文件已经被下载编译过了，之后再运行就会从缓存中读取：

![remote](http://lc-3Cv4Lgro.cn-n1.lcfile.com/57dfee961acfcd540308/cached.jpg)

如果想重新下载、编译则可以使用 `-r` 或 `--reload` 参数，表示reload：

![reload](http://lc-3Cv4Lgro.cn-n1.lcfile.com/f52998ab07ea82e62eb6/reload.jpg)

# Deno运行时（Runtime）

Deno的运行时由标准的[Web APIs](https://doc.deno.land/https/raw.githubusercontent.com/denoland/deno/master/cli/dts/lib.deno.shared_globals.d.ts) + [Deno global](https://doc.deno.land/https/raw.githubusercontent.com/denoland/deno/master/cli/dts/lib.deno.ns.d.ts) 这两大部分组成。

实现Web APIs主要是为了遵循已有的web标准，提供大家都熟悉的接口，以降低学习和使用成本，也让我们前端同学更容易上手，比如常见的 `console`、`fetch`、`setTimeout` 等方法在Deno中仍可以正常使用。Web APIs的作用域为全局，即可以直接使用或者通过 `window.***`、`globalThis.***` 调用。Deno 实现的所有Web APIs可参考 [Github Repo](https://github.com/denoland/deno/blob/master/cli/rt/README.md) 。

除了 Web APIs，Deno自有的API都放在 `Deno` 这个命名空间下，比如文件操作、建立网络连接、管理子进程等。

## Web APIs

以 fetch API 为例展示 Deno中 Web APIs的使用。

### Fetch API

比如获取一个远程资源：

**fetch.ts：**

```ts
const res = await window.fetch('https://jsonplaceholder.typicode.com/posts/1');
const data = await res.json();

console.log(data);
```

**运行：**

```sh
deno run --allow-net fetch.ts
```

> 注意：进行网络访问也需要单独授权，使用 `--allow-net` flag。

**结果：**

![fetch](http://lc-3Cv4Lgro.cn-n1.lcfile.com/cbdb103e7fa4512dcbf8/fetch.jpg)

我们也可以给 `--allow-net` 指定可访问的域名，则访问未指定的域名就会报错。比如，将上面的命令改为：

```sh
deno run --allow-net=github.com fetch.ts
```

**结果：**

![fetch other domain](http://lc-3Cv4Lgro.cn-n1.lcfile.com/f6231c4dd70022c8569a/fetch-other-domain.jpg)


## Deno Global

和 Node 一样，Deno 也能操作文件系统，接下来我们以此为例展示 Deno global APIs 的使用。

## 读取文件 

比如，读取一个txt文本：

**doc.txt**

```
This is my first deno app.
```

**read.ts**

```ts
const decoder = new TextDecoder('utf-8');

const data = await Deno.readFile('doc.txt');

console.log(decoder.decode(data));
```

> 如果使用VSCode进行开发，推荐安装 [Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno) 插件。

和 Node 不同，Deno 默认是没有操作文件权限的，如果使用 `deno run read.ts` 运行就会报错：

![read err](http://lc-3Cv4Lgro.cn-n1.lcfile.com/cdee6320ec7b7730b7e8/read%20err.jpg)

因为我们需要手动的赋予读取文件的权限，使用 `--allow-read` flag：

![read](http://lc-3Cv4Lgro.cn-n1.lcfile.com/751f946a20c1dc3ba77c/read.jpg)

## 写文件

与读文件对应的，写文件的操作如下：

**write.ts**

```ts
const encoder = new TextEncoder();

const txt = 'Deno is awesome!';

await Deno.writeFile('doc.txt', encoder.encode(txt));
```

同样的，我们需要手动赋予写文件的权限：

```sh
deno run --allow-write  write.ts
```

## 重命名文件

**rename.ts**

```ts
await Deno.rename('doc.txt','readme.txt');
```

重命名文件需要同时赋予读和写的权限：

```sh
deno run --allow-read --allow-write rename.ts
```

## 删除文件

**delete.ts**

```ts
await Deno.remove('doc.txt');
```

删除文件需要写的权限：

```sh
deno run --allow-write delete.ts
```

# Deno标准库

除了 Web APIs 和 Deno global，Deno官方团队还提供了一个标准库，即一组高质量的工具集。这个标准库不包含任何第三方依赖，而且代码都会由Deno核心团队审查，因此能保证高质量。

> 标准库地址：https://deno.land/std

接下来，我们以几个常用的模块为例展示标准库的用法。

## uuid（通用唯一识别码）

**uuid** 的作用是生成一个128位的全局唯一的ID。

**uuid.ts:**

```ts
import { v4 } from "https://deno.land/std@0.62.0/uuid/mod.ts";

const myUUID = v4.generate();

console.log(myUUID);
```

> 标准库的版本Deno的版本暂时不统一，使用标准库时应该指定稳定的版本号，如本例中的 `0.62.0`，以避免意外的更新和重大更改。

**运行：**

```sh
deno run uuid.ts 
```

**结果：**

![uuid](http://lc-3Cv4Lgro.cn-n1.lcfile.com/c9172e9ff30c3a657afd/uuid.jpg)

> uuid模块地址：https://deno.land/std/uuid

## fs（文件系统）

标准库中的 **fs** 是对Deno自带文件操作的扩展，比如增加了对JSON文件的读取：

**fs.ts**

```ts
import {readJson} from 'https://deno.land/std@0.62.0/fs/mod.ts';

const posts = await readJson('./posts.json');

console.log(posts);
```

**运行：**

```sh
deno run --allow-read --unstable fs.ts
```

> 因为设计到一些不稳定API的调用，所以要加上 `--unstable` flag 以启用这些API

**结果：**

![fs](http://lc-3Cv4Lgro.cn-n1.lcfile.com/f3175e9eb3107f24bb88/fs.jpg)
