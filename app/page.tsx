import type { ReactElement, FormEvent } from 'react'

import { cloneElement } from 'react'
import { FormGroup, Input } from '@/comps/form-elements'
import { LoginButton } from '@/comps/buttons'
import { LoginModal, RegisterModal } from '@/comps/modal'

import * as auth from '@/utils/auth-provider'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="grid grid-cols-2 gap-3">
        <LoginModal>
          <Form
            submitButton={<LoginButton variant="primary">Login</LoginButton>}
          />
        </LoginModal>

        <RegisterModal>
          <Form
            onSubmit={auth.register}
            submitButton={<LoginButton variant="primary">Login</LoginButton>}
          />
        </RegisterModal>
      </div>
    </div>
  )
}

const Form = async ({ onSubmit, submitButton }: { onSubmit: any submitButton: ReactElement }) => {
  const handleSubmit = async (data: FormData) => {
    'use server'

    const email = data.get('email')
    const password = data.get('email')

    onSubmit({ email, password })
  }

  return (
    <form action={handleSubmit} className="flex flex-col items-stretch w-full max-w-xs">
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
