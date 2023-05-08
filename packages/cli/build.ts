import { build } from 'tsup'

async function main() {
  await build({
    entry: ['index.ts'],
    clean: true,
    format: ['esm'],
    skipNodeModulesBundle: true,
    target: 'esnext',
    bundle: true,
    dts: true,
  })
}

main()
