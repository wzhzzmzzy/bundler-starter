# Bundler Starter

一个简单的实验项目，用于测试不同打包器打包纯 JS 文件的行为。

## 打包器

1. rollup
2. esbuild
3. webpack

## 打包内容和输出方式

一系列 JS 文件，引用关系和输出方式类似 Loadsh

1. 打包成单个文件，包括 UMD、ESM、CJS
2. 打包成多个文件，ESM 和 CJS 放在不同的目录里输出
3. 输出完整的 .d.ts
