const getEnv = () => {
  return {
    SIGN_IN_URL: process.env.NEXT_PUBLIC_SIGN_IN_URL,
    SIGN_UP_URL: process.env.NEXT_PUBLIC_SIGN_UP_URL,
    REFRESH_URL: process.env.NEXT_PUBLIC_REFRESH_URL,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  }
}

type ENV = ReturnType<typeof getEnv>

// App puts these on
declare global {
  // eslint-disable-next-line
  var ENV: ENV
  interface Window {
    ENV: ENV
  }
}

export { getEnv }
