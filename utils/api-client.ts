import { useCallback } from 'react'
import { useAuth } from '@clerk/nextjs'
import { getEnv } from './env'

const { BASE_URL } = getEnv()

type Config = {
  data: { [key: string]: string }
  token: string
}

const client = async (endpoint: string, { data, token }: Config) => {
  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': data && 'application/json',
    },
  }

  return window
    .fetch(`${BASE_URL}/${endpoint}`, config)
    .then(async response => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

const useClient = () => {
  const { getToken } = useAuth()

  return useCallback(async (endpoint: string, config: Config) => {
    const token = (await getToken()) ?? ''

    return client(endpoint, { ...config, token })
  }, [])
}

export { useClient }
