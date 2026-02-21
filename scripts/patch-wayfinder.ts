// scripts/patch-wayfinder.ts
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const filePath = 'resources/js/wayfinder/types.d.ts'

if (!existsSync(filePath)) {
    console.log('⚠ wayfinder/types.d.ts não encontrado, pulando patch.')
    process.exit(0)
}

const original = readFileSync(filePath, 'utf-8')

const patched = original.replace(/(\w)\/(\w)/g, '$1_$2')

if (original === patched) {
    console.log('✔ Nenhum patch necessário.')
    process.exit(0)
}

writeFileSync(filePath, patched)
console.log('✔ wayfinder/types.d.ts corrigido com sucesso.')
