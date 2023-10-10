const getEnv = () => {
  return {
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
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
