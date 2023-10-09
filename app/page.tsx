'use client'

import type { ReactElement, SyntheticEvent } from 'react'
import type { SignUpResource, SignInResource } from '@clerk/types'

import { cloneElement } from 'react'
import { FormGroup, Input } from '@/comps/form-elements'
import { Button } from '@/comps/buttons'
import { Modal } from '@/comps/modal'

import { useSignUp, useSignIn } from '@clerk/nextjs'
import { useAsync } from '@/utils/use-async'

const Home = () => {
  return (
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
}

type OnSubmit<DataType> = (email: string, password: string) => Promise<DataType>

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
}

interface Form extends HTMLFormElement {
  readonly elements: FormElements
}

const LoginForm = <DataType,>({
  onSubmit,
  submitButton,
}: {
  onSubmit: OnSubmit<DataType>
  submitButton: ReactElement
}) => {
  const { run } = useAsync<DataType>()

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

const SignInForm = () => {
  const { signIn, setActive } = useSignIn()

  if (!signIn) return null

  const onSubmit: OnSubmit<SignInResource> = async (email, password) => {
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
    <LoginForm<SignInResource>
      onSubmit={onSubmit}
      submitButton={<Button variant="primary">Login</Button>}
    />
  )
}

const SignUpForm = () => {
  const { signUp, setActive } = useSignUp()

  if (!signUp) return null

  const onSubmit: OnSubmit<SignUpResource> = async (email, password) => {
    return signUp
      .create({
        emailAddress: email,
        password,
      })
      .then(async response => {
        const completeSignUp = await response.prepareEmailAddressVerification({
          strategy: 'email_link',
          redirectUrl: 'http://localhost:3000/discover',
        })

        if (completeSignUp.status === 'complete') {
          await setActive({ session: completeSignUp.createdSessionId })
        }

        return response
      })
  }

  return (
    <LoginForm<SignUpResource>
      onSubmit={onSubmit}
      submitButton={<Button variant="secondary">Register</Button>}
    />
  )
}
