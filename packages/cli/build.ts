import { build } from 'tsup'

async function main() {
  await build({
    entry: ['index.ts'],
    clean: true,
    format: ['cjs', 'esm'],
    skipNodeModulesBundle: true,
    target: 'es2015',
    minify: true,
    bundle: true,
    dts: true,
  })
}

main()
