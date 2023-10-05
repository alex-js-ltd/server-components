import {
  createContext,
  cloneElement,
  useContext,
  useState,
  ReactElement,
  ReactNode,
} from 'react'

import Dialog from './dialog'
import CircleButton from './circle-button'

const callAll =
  (...fns: Function[]) =>
  (...args: any) =>
    fns.forEach((fn: Function) => fn && fn(...args))

const ModalContext = createContext<
  { isOpen: boolean; setIsOpen: Function } | undefined
>(undefined)

const Modal = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  const value = { isOpen, setIsOpen }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error(`useModal must be used within a ModalContext provider`)
  }
  return context
}

Modal.DismissButton = ({ children: child }: { children: ReactElement }) => {
  const { setIsOpen } = useModal()

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

Modal.OpenButton = ({ children: child }: { children: ReactElement }) => {
  const { setIsOpen } = useModal()

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

Modal.ContentsBase = ({ children }: { children: ReactNode }) => {
  const { isOpen, setIsOpen } = useModal()

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      {children}
    </Dialog>
  )
}

Modal.Contents = ({
  title,
  children,
}: {
  title: string
  children: ReactElement
}) => {
  return (
    <Modal.ContentsBase>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Modal.DismissButton>
          <CircleButton>
            <span aria-hidden>×</span>
          </CircleButton>
        </Modal.DismissButton>
      </div>
      <h3 style={{ textAlign: 'center', fontSize: '2em' }}>{title}</h3>
      {children}
    </Modal.ContentsBase>
  )
}

export { Modal }
