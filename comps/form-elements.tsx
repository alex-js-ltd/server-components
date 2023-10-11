const FormGroup = (props: JSX.IntrinsicElements['input']) => (
  <div {...props} className="flex flex-col w-full my-2" />
)

const Input = (props: JSX.IntrinsicElements['input']) => (
  <input
    {...props}
    className="border border-gray-300 bg-gray-200 p-2 rounded-md w-full"
  />
)

const CircleForm = (props: JSX.IntrinsicElements['form']) => (
  <form
    {...props}
    className="rounded-full w-10 h-10 leading-10 flex items-center justify-center bg-base text-text border border-gray-10 cursor-pointer"
  />
)

export { FormGroup, Input, CircleForm }
