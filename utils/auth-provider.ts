'use server'

import { getEnv } from './env'

const { SIGN_UP_URL } = getEnv()

console.log('url', SIGN_UP_URL)

const register = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  client(SIGN_UP_URL, { email, password, returnSecureToken: true })
  return client(SIGN_UP_URL, { email, password, returnSecureToken: true }).then(
    res => console.log(res),
  )
}

const client = async <DataType>(
  endpoint: string | undefined,
  data: DataType,
) => {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  }

  console.log('config', config)

  return fetch(`${endpoint}`, config).then(async response => {
    const data = await response.json()

    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export { client, register }
