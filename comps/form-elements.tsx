import type { ReactNode } from 'react'
import { clsx } from 'clsx'

function FormGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>
}

function Input(props: JSX.IntrinsicElements['input']) {
  const className = clsx(
    'border border-gray-300 bg-gray-200 p-2 rounded-md',
    props.className,
  )
  return <input {...props} className={className} />
}

export { FormGroup, Input }
