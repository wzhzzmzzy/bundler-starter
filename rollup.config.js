import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import { globSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const umdConfig = ({ compact = false, filename = 'bundle.js' }) => ({
    input: 'src/index.ts',
    output: {
        file: `rollup-dist/umd/${filename}`,
        format: 'umd',
        name: 'leetcode',
        compact,
    },
    plugins: [typescript({
        compilerOptions: {
            outDir: 'rollup-dist/umd',
            declaration: false
        }
    })].concat(compact ? [terser()] : []),
})

const input = Object.fromEntries(globSync('./src/**/*.ts').map(file => [
        path.relative(
            'src',
            file.slice(0, file.length - path.extname(file).length)
        ),
        fileURLToPath(new URL(file, import.meta.url))
    ]))

const libConfig = ({ format = 'cjs' }) => ({
    input,
    output: {
        dir: `rollup-dist/${format}`,
        format: 'cjs',
        hoistTransitiveImports: false,
        generatedCode: 'es2015'
    },
    plugins: [typescript({
        compilerOptions: {
            outDir: `rollup-dist/${format}`,
            declaration: false
        }
    })]
})

const dtsConfig = () => ({
    input,
    output: {
        dir: 'rollup-dist/types',
        generatedCode: 'es2015',
        preserveModules: true,
        preserveModulesRoot: 'src',
    },
    plugins: [dts()]
})

export default [
    umdConfig({ compact: true, filename: 'bundle.min.js' }),
    umdConfig({}),
    libConfig({ format: 'cjs' }),
    libConfig({ format: 'esm' }),
    dtsConfig()
]