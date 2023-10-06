import { clsx } from 'clsx'

const FormGroup = (props: JSX.IntrinsicElements['input']) => {
  return <div {...props} className="flex flex-col max-w-xs w-full my-2" />
}

const Input = (props: JSX.IntrinsicElements['input']) => {
  const className = clsx(
    'border border-gray-300 bg-gray-200 p-2 rounded-md',
    props.className,
  )
  return <input {...props} className={className} />
}

export { FormGroup, Input }
