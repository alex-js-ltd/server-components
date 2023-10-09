'use client'

import type { ReactElement, FormEvent } from 'react'
import type { SignUpResource, SignInResource } from '@clerk/types'

import { cloneElement } from 'react'
import { FormGroup, Input } from '@/comps/form-elements'
import { LoginButton } from '@/comps/buttons'
import { Modal } from '@/comps/modal'

import { useSignUp } from '@clerk/nextjs'
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
            <div></div>
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

type OnSubmit = (email: string, password: string) => Promise<SignUpResource>

const Form = ({
  onSubmit,
  submitButton,
}: {
  onSubmit: OnSubmit
  submitButton: ReactElement
}) => {
  const { run } = useAsync<SignUpResource | SignInResource>()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget

    const formElements = form.elements as typeof form.elements & {
      email: HTMLInputElement
      password: HTMLInputElement
    }

    run(onSubmit(formElements.email.value, formElements.password.value))
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

const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp()

  if (!signUp) return null

  const onSubmit: OnSubmit = async (email, password) => {
    return signUp
      .create({
        emailAddress: email,
        password,
      })
      .then(res =>
        res.prepareEmailAddressVerification({
          strategy: 'email_link',
          redirectUrl: 'http://localhost:3000/search',
        }),
      )
  }

  return (
    <Form
      onSubmit={onSubmit}
      submitButton={<LoginButton variant="primary">Register</LoginButton>}
    />
  )
}
