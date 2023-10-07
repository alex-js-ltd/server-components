'use client'

import type { ReactElement, FormEvent } from 'react'

import { cloneElement } from 'react'
import { FormGroup, Input } from '@/comps/form-elements'
import { LoginButton } from '@/comps/buttons'
import { Modal } from '@/comps/modal'

import { useSignUp, useSignIn } from '@clerk/nextjs'
import { useAsync } from '@/utils/use-async'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="grid grid-cols-2 gap-3">
        <Modal>
          <Modal.OpenButton>
            <LoginButton variant="primary">Login</LoginButton>
          </Modal.OpenButton>
          <Modal.Contents title="Login">
            <SignInForm />
          </Modal.Contents>
        </Modal>
        <Modal>
          <Modal.OpenButton>
            <LoginButton variant="secondary">Register</LoginButton>
          </Modal.OpenButton>
          <Modal.Contents title="Register">
            <SignUpForm />
          </Modal.Contents>
        </Modal>
      </div>
    </div>
  )
}

const Form = ({ submitButton }: { submitButton: ReactElement }) => {
  const { isLoading, isError, error, run } = useAsync()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    const formElements = form.elements as typeof form.elements & {
      email: HTMLInputElement
      password: HTMLInputElement
    }

    // run(
    //   onSubmit({
    //     username: formElements.email.value,
    //     password: formElements.password.value,
    //   }),
    // )
  }

  return (
    <form className="flex flex-col items-stretch w-full max-w-xs">
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
  const props = useSignIn()

  return (
    <Form submitButton={<LoginButton variant="primary">Login</LoginButton>} />
  )
}

const SignUpForm = () => {
  const props = useSignUp()
  return (
    <Form
      submitButton={<LoginButton variant="secondary" children="Register" />}
    />
  )
}
