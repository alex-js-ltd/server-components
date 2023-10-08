'use server'

import { getEnv } from './env'

const { SIGN_UP_URL, SIGN_IN_URL } = getEnv()

const register = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  return client(SIGN_UP_URL, { email, password, returnSecureToken: true })
}

const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  return client(SIGN_IN_URL, { email, password, returnSecureToken: true })
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

  return fetch(`${endpoint}`, config).then(async response => {
    const data = await response.json()

    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export { client, register, login }
