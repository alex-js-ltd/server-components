import type { ComponentProps } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { clsx } from 'clsx'

const Spinner = (props: ComponentProps<typeof FaSpinner>) => {
  const { className, ...rest } = props
  return (
    <FaSpinner
      {...rest}
      className={clsx(className, 'animate-spin')}
      aria-label="loading"
    />
  )
}
export default Spinner
