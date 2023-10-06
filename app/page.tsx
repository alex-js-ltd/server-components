'use client'

import type { ReactElement, FormEvent } from 'react'
import { cloneElement } from 'react'
import { Modal } from '@/comps/modal'
import { FormGroup, Input } from '@/comps/form-elements'
import { LoginButton } from '@/comps/buttons'

const Home = () => {
  return (
    <main>
      <Modal>
        <Modal.OpenButton>
          <LoginButton variant="primary">Login</LoginButton>
        </Modal.OpenButton>

        <Modal.Contents title="Login">
          <LoginForm
            submitButton={<LoginButton variant="primary" children="Login" />}
          />
        </Modal.Contents>
      </Modal>

      <Modal>
        <Modal.OpenButton>
          <LoginButton variant="secondary">Register</LoginButton>
        </Modal.OpenButton>

        <Modal.Contents title="Register">
          <LoginForm
            submitButton={
              <LoginButton variant="secondary" children="Register" />
            }
          />
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
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
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

export default Home
