import { getEnv } from './env'

const { NODE_ENV, VERCEL_URL } = getEnv()

const getBaseURL = () => {
  if (NODE_ENV === 'production') {
    return `https://${VERCEL_URL}`
  }
  return 'http://localhost:3000'
}

export { getBaseURL }
