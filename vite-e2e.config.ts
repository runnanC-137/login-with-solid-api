import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.{e2e-test,e2e-spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  }
})
