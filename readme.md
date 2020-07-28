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

![deno command](http://lc-3Cv4Lgro.cn-n1.lcfile.com/5b6647a1119e74bba67c/deno-command.jpg)

如果要查看Deno的版本，输入：

```sh
deno --version
```