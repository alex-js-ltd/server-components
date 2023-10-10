const getEnv = () => {
  return {
    CLERK_WEBHOOK_SECRET_DEV: process.env.CLERK_WEBHOOK_SECRET_DEV ?? '',
    CLERK_WEBHOOK_SECRET_PRODUCTION:
      process.env.CLERK_WEBHOOK_SECRET_PRODUCTION ?? '',
    NODE_ENV: process.env.NODE_ENV,
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
