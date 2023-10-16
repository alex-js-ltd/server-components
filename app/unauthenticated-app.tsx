'use client'

import type { ReactElement, SyntheticEvent } from 'react'
import type { SignUpResource, SignInResource } from '@clerk/types'

import { cloneElement } from 'react'
import { FormGroup, Input } from '@/comps/form-elements'
import { Button } from '@/comps/buttons'
import { Modal } from '@/comps/modal'
import Spinner from '@/comps/spinner'

import { useSignUp, useSignIn } from '@clerk/nextjs'
import { useAsync } from '@/utils/use-async'
import { getEnv } from '@/utils/env'

const { BASE_URL } = getEnv()

const UnauthenticatedApp = () => (
  <div className="flex flex-col items-center justify-center w-full h-screen">
    <div className="grid grid-cols-2 gap-3">
      <Modal>
        <Modal.OpenButton>
          <Button variant="primary">Login</Button>
        </Modal.OpenButton>
        <Modal.Contents title="Login">
          <SignInForm />
        </Modal.Contents>
      </Modal>

      <Modal>
        <Modal.OpenButton>
          <Button variant="secondary">Register</Button>
        </Modal.OpenButton>
        <Modal.Contents title="Register">
          <SignUpForm />
        </Modal.Contents>
      </Modal>
    </div>
  </div>
)

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
}

interface Form extends HTMLFormElement {
  readonly elements: FormElements
}

interface LoginFormProps {
  onSubmit(
    email: string,
    password: string,
  ): Promise<SignUpResource | SignInResource>
  submitButton: ReactElement
}

const LoginForm = ({ onSubmit, submitButton }: LoginFormProps) => {
  const { isLoading, run } = useAsync<SignUpResource | SignInResource>()

  const handleSubmit = (event: SyntheticEvent<Form>) => {
    event.preventDefault()
    const form = event.currentTarget

    run(onSubmit(form.email.value, form.password.value))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-stretch w-full max-w-xs"
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
        {cloneElement(submitButton, {
          type: 'submit',
          children: isLoading ? <Spinner /> : submitButton.props.children,
          disabled: isLoading,
        })}
      </div>
    </form>
  )
}

const SignInForm = () => {
  const { signIn, setActive } = useSignIn()

  if (!signIn) return null

  const onSubmit = async (email: string, password: string) => {
    return signIn
      .create({
        identifier: email,
        password,
      })
      .then(async response => {
        if (response.status === 'complete') {
          await setActive({ session: response.createdSessionId })
        }

        return response
      })
  }

  return (
    <LoginForm
      onSubmit={onSubmit}
      submitButton={<Button variant="primary">Login</Button>}
    />
  )
}

const SignUpForm = () => {
  const { signUp, setActive } = useSignUp()

  if (!signUp) return null

  const onSubmit = async (email: string, password: string) => {
    return signUp
      .create({
        emailAddress: email,
        password,
      })
      .then(async response => {
        const completeSignUp = await response.prepareEmailAddressVerification({
          strategy: 'email_link',
          redirectUrl: `${BASE_URL}`,
        })

        if (completeSignUp.status === 'complete') {
          await setActive({ session: completeSignUp.createdSessionId })
        }

        return response
      })
  }

  return (
    <LoginForm
      onSubmit={onSubmit}
      submitButton={<Button variant="secondary">Register</Button>}
    />
  )
}

export default UnauthenticatedApp
