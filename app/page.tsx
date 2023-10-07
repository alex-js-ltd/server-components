import type { ReactElement, FormEvent } from 'react'
import { cloneElement } from 'react'
import { FormGroup, Input } from '@/comps/form-elements'
import { LoginButton } from '@/comps/buttons'
import { AuthModal } from '@/comps/modal'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="grid grid-cols-2 gap-3">
        <AuthModal
          openButton={<LoginButton variant="primary" children="Login" />}
          title="Login"
        >
          <LoginForm
            submitButton={<LoginButton variant="primary" children="Login" />}
          />
        </AuthModal>

        <AuthModal
          openButton={<LoginButton variant="secondary" children="Register" />}
          title="Register"
        >
          <LoginForm
            submitButton={
              <LoginButton variant="secondary" children="Register" />
            }
          />
        </AuthModal>
      </div>
    </div>
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
