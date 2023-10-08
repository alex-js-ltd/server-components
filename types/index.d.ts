type OnSubmitData = {
  email: string
  password: string
}

type OnSubmit = (props: OnSubmitData) => Promise<void>

export { OnSubmitData, OnSubmit }
