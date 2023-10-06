export function CircleButton(props: JSX.IntrinsicElements['button']) {
  return (
    <button
      className="rounded-full w-10 h-10 leading-10 flex items-center justify-center bg-base text-text border border-gray-10 cursor-pointer"
      {...props}
    />
  )
}
