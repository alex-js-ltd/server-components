import { clsx } from 'clsx'

const CircleButton = (props: JSX.IntrinsicElements['button']) => (
  <button
    {...props}
    className="rounded-full w-10 h-10 leading-10 flex items-center justify-center bg-base text-text border border-gray-10 cursor-pointer"
  />
)

const Button = ({
  variant,
  ...rest
}: JSX.IntrinsicElements['button'] & { variant: 'primary' | 'secondary' }) => {
  const { className } = rest

  return (
    <button
      {...rest}
      className={clsx(className, 'px-4 py-2 rounded border', {
        'bg-indigo-500 text-white': variant === 'primary',
        'bg-gray-300 text-black': variant === 'secondary',
      })}
    />
  )
}

export { CircleButton, Button }
