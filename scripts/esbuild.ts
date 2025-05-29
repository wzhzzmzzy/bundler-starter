import { build, BuildOptions } from 'esbuild'
import * as path from 'node:path'

const outDir = './esbuild-dist'

/*
  由于 esbuild 不支持 umd 打包，使用了 format: 'iife' 选项
  esbuild 打包后的代码会使用 globalThis.leetcode 对象作为全局对象
*/

/// umd

const buildConfig: BuildOptions = ({
    bundle: true,
    entryPoints: ['./src/index.ts'],
    sourcemap: false,
    outfile: path.join(outDir, 'umd', 'bundle.js'),
    format: 'iife',
    platform: 'browser',
    target: ['chrome160', 'node22', 'es2020', 'deno2'],
    globalName: 'globalThis.leetcode',
})

build(buildConfig)
build({
    ...buildConfig,
    outfile: path.join(outDir, path.join('umd', 'bundle.min.js')),
    minify: true,
})

/// cjs

build({
    bundle: true,
    entryPoints: ['./src/**/*.ts'],
    outdir: path.join(outDir, 'cjs'),
    format: 'cjs',
    platform: 'node',
    target: ['node22'],
    sourcemap: false,
})

/// esm

build({
    bundle: true,
    entryPoints: ['./src/**/*.ts'],
    outdir: path.join(outDir, 'esm'),
    format: 'esm',
    platform: 'node',
    target: ['node22'],
    sourcemap: false,
})
