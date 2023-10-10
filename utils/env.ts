const getEnv = () => {
  return {
    CLERK_WEBHOOK_SECRET_DEV: process.env.CLERK_WEBHOOK_SECRET_DEV as string,
    CLERK_WEBHOOK_SECRET_PRODUCTION: process.env
      .CLERK_WEBHOOK_SECRET_PRODUCTION as string,
    NODE_ENV: process.env.NODE_ENV as string,
    BASE_URL: process.env.BASE_URL as string,
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
