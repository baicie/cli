import { expect, test } from 'vitest'

import pkg from '../index.js'

const { plus100 } = pkg

test('sync function from native code', () => {
  const fixture = 42
  expect(plus100(fixture)).toBe(fixture + 100)
})
