'use client'

import type { ReactElement, FormEvent } from 'react'
import { cloneElement } from 'react'
import { Modal } from '@/comps/modal'
import { FormGroup, Input } from '@/comps/form-elements'

export default function Home() {
  return (
    <main>
      <Modal>
        <Modal.OpenButton>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Default
          </button>
        </Modal.OpenButton>

        <Modal.Contents title="hello">
          <LoginForm submitButton={<button></button>} />
        </Modal.Contents>
      </Modal>
    </main>
  )
}

const LoginForm = ({ submitButton }: { submitButton: ReactElement }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    const formElements = form.elements as typeof form.elements & {
      email: HTMLInputElement
      password: HTMLInputElement
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='class="flex flex-col items-stretch"'
    >
      <FormGroup>
        <label htmlFor="email">Email</label>
        <Input id="email" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        {cloneElement(
          submitButton,
          { type: 'submit' },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
        )}
      </div>
    </form>
  )
}
