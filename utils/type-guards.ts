import { OnSubmitData } from '@/types'

const isOnSubmitData = (valueToTest: unknown): valueToTest is OnSubmitData => {
  return (
    Boolean(valueToTest) &&
    typeof valueToTest === 'object' &&
    typeof (valueToTest as OnSubmitData).email === 'string' &&
    typeof (valueToTest as OnSubmitData).password === 'string'
  )
}

export { isOnSubmitData }
