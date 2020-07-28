# 什么是Deno

Deno是新一代的 JavaScript 和 TypeScript 运行时（runtime），使用 [Rust](https://www.rust-lang.org/) 实现，和 Node.js 一样内部也使用 [V8](https://v8.dev/) 引擎，而且Deno 和 Node.js 的作者是同一个人：[Ryan Dahl](https://github.com/ry)。他创造Deno的初衷是为了弥补 Node.js 的某些设计缺陷，但鉴于目前Node的生态已经如此繁荣，Deno暂时还无法完全取代Node，Node还将长期稳定存在。

Deno的主要特点有：

1. 安全性：默认没有文件、网络、系统环境的访问权限，除非明确启用。与之相比，Node.js默认是不安全的。

1. 天生支持TypeScript

1. 使用ES6的模块系统（Node.js 使用的是CommonJS模块系统）

1. 可以使用标准的Web API，比如：fetch

1. 拥有一个标准模块库，可保证与Deno一起使用

1. 只生成一个可执行文件

1. 内置工具程序，比如依赖检查器、代码格式化程序

1. 通过imports，而不是npm安装依赖

Deno目前还处于早期发展阶段，所以一些功能和API可能还会有变动，同时生态也并不完善，社区提供的工具或多或少会有bug，但是这些都是正常的，并不妨碍我们去提前学习和了解这个更优秀的 Node.js 替代品。

# 安装Deno

**Homebrew (Mac) 推荐:**

```sh
brew install deno
```

**Chocolatey (Windows) 推荐:**

```sh
choco install deno
```

**Shell (Mac, Linux):**

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

**PowerShell (Windows):**

```sh
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

安装完成后，在命令行里面输入 `deno` 命令就可以进入编程模式：

![deno command](http://lc-3Cv4Lgro.cn-n1.lcfile.com/71f852eafd8111733017/deno.jpg)

使用 `deno --version` 查看Deno的版本：

![deno version](http://lc-3Cv4Lgro.cn-n1.lcfile.com/fa8e4133e234da5a469e/version.jpg)

# 运行JS、TS文件

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

# 文件系统

和 Node 一样，Deno 也能操作文件系统。

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

但和 Node 不同，Deno 默认是没有操作文件权限的，如果使用 `deno run read.ts` 运行就会报错：

![read err](http://lc-3Cv4Lgro.cn-n1.lcfile.com/cdee6320ec7b7730b7e8/read%20err.jpg)

因为我们需要手动的赋予读取文件的权限，使用 `--allow-read` flag：

![read](http://lc-3Cv4Lgro.cn-n1.lcfile.com/751f946a20c1dc3ba77c/read.jpg)