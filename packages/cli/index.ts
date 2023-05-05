import type { Answers } from 'prompts'
import consola from 'consola'
import prompts from 'prompts'

async function main() {
  consola.info('Hello main!')
  let result: Answers<'demo'>
  try {
    result = await prompts(
      [
        {
          type: 'text',
          name: 'demo',
          message: 'What is your name?',
        },
      ],
    )
  }
  catch (error) {

  }

  const { demo } = result
  consola.success(`Hello ${demo}!`)
}

main().catch((e) => {
  console.error(e)
})
