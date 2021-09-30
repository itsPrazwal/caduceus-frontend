import { FC, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useUserContext } from 'Context'

import { ScreenLoading, VerifyUser } from 'Components'

const RouteGuard:FC = ({ children }) => {

  const router = useRouter()
  const { user: { waiting, isVerified, loading }, isLoggedIn } = useUserContext()

  const logOutUser = useCallback(async () => {
    console.log('No User Found, Logging Out !!!')
    localStorage.clear()
    await router.push('/')
  }, [router])

  useEffect(() => {
    if(!waiting && !isLoggedIn) {
      logOutUser()
    }
  }, [waiting, isLoggedIn, logOutUser])

  return loading
    ? <ScreenLoading />
    : isLoggedIn
      ? isVerified
        ? (
          <>
            {children}
          </>
        )
        : <VerifyUser />
      : null

}

export default RouteGuard


