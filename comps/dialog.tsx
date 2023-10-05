import * as RadixDialog from '@radix-ui/react-dialog'
import { ComponentProps, PropsWithChildren } from 'react'

const Dialog = (
  props: PropsWithChildren<ComponentProps<typeof RadixDialog.Root>>,
) => {
  const { children, ...rest } = props

  return <RadixDialog.Root {...rest}>{children}</RadixDialog.Root>
}

export default Dialog
