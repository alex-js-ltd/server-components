import type { ReactElement } from 'react'

import { cloneElement } from 'react'
import { FormGroup, Input } from '@/comps/form-elements'
import { LoginButton } from '@/comps/buttons'
import { LoginModal, RegisterModal } from '@/comps/modal'
import { isOnSubmitData } from '@/utils/type-guards'
import { OnSubmit } from '@/types'
import * as auth from '@/utils/auth-provider'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="grid grid-cols-2 gap-3">
        <LoginModal>
          <Form
            onSubmit={auth.register}
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

const Form = async ({
  onSubmit,
  submitButton,
}: {
  onSubmit: OnSubmit
  submitButton: ReactElement
}) => {
  const handleSubmit = async (data: FormData) => {
    'use server'

    const onSubmitData = {
      email: data.get('email'),
      password: data.get('password'),
    }

    if (isOnSubmitData(onSubmitData)) {
      await onSubmit({ ...onSubmitData })
    }
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col items-stretch w-full max-w-xs"
    >
      <FormGroup>
        <label htmlFor="email">Email</label>
        <Input id="email" name="email" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" name="password" />
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
