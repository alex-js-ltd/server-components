import { getEnv } from './env'

const { BASE_URL } = getEnv()

type Config<DataType> = {
  data: DataType
  token: string
}

const client = async <DataType>(
  endpoint: string,
  { data, token }: Config<DataType>,
) => {
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

export { client }
