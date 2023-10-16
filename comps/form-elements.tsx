const FormGroup = (props: JSX.IntrinsicElements['div']) => (
  <div {...props} className="flex flex-col w-full my-2" />
)

const Input = (props: JSX.IntrinsicElements['input']) => (
  <input
    {...props}
    className="border border-gray-300 bg-gray-100 p-2 rounded-md w-full text-gray-600 focus:outline-none focus:ring-0 focus:border-blue-400"
  />
)

const TextArea = (props: JSX.IntrinsicElements['textarea']) => (
  <textarea
    {...props}
    className="border border-gray-300 bg-gray-100 p-2 rounded-md w-full text-gray-600 focus:outline-none focus:ring-0 focus:border-blue-400 min-h-[300px]"
  />
)

export { FormGroup, Input, TextArea }
