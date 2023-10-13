'use client'
import type { ReactElement } from 'react'
import { clsx } from 'clsx'
import { useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'
import Spinner from './spinner'
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

type CircleButtonProps = JSX.IntrinsicElements['button'] & {
  variant?: 'indigo' | 'red' | 'white' | 'gray' | 'green' | 'yellow'
}

const CircleButton = (props: CircleButtonProps) => {
  const { className, variant, ...rest } = props
  return (
    <button
      {...rest}
      className={clsx(
        className,
        'rounded-full w-10 h-10 leading-10 flex items-center justify-center bg-base text-text border border-gray-10 cursor-pointer bg-white text-gray-400',

        {
          'hover:text-blue-400': variant === 'indigo',
          'hover:text-red-400': variant === 'red',
          'hover:text-white': variant === 'white',
          'hover:text-gray-400': variant === 'gray',
          'hover:text-green-400': variant === 'green',
          'hover:text-yellow-400': variant === 'yellow',
        },
      )}
    />
  )
}

const Button = (
  props: JSX.IntrinsicElements['button'] & { variant: 'primary' | 'secondary' },
) => {
  const { className, variant, ...rest } = props

  return (
    <button
      {...rest}
      className={clsx(
        className,
        'px-4 py-2 rounded border min-h-[42px] min-w-[93px] flex items-center justify-center',
        {
          'bg-indigo-300 text-white': variant === 'primary',
          'bg-gray-300 text-black': variant === 'secondary',
        },
      )}
    />
  )
}

const SignOutButton = () => {
  const { signOut } = useClerk()
  const router = useRouter()

  const onClick = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <Button variant="secondary" onClick={onClick} className="ml-10">
      Sign out
    </Button>
  )
}

const SubmitButton = ({
  variant,
  icon,
}: {
  variant: CircleButtonProps['variant']
  icon: ReactElement
}) => {
  const { pending } = useFormStatus()

  return (
    <CircleButton
      variant={pending ? 'gray' : variant}
      type="submit"
      aria-disabled={pending}
    >
      {pending ? <Spinner /> : icon}
    </CircleButton>
  )
}

export { CircleButton, Button, SignOutButton, SubmitButton }

export type { CircleButtonProps }
