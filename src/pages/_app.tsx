import { useMemo } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import RouteGuard from 'Config/RouteGuard'

import { DataProvider, ThemeProvider, UserProvider } from 'Context'
import { ToastContainer } from 'react-toastify'

import 'Components/Styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'

const MyApp = ({ Component }: AppProps) => {

  const router = useRouter()
  const privateRoutes = {
    profile: 1
  }

  const route:string = useMemo(() =>  router.pathname.split('/')[1], [router])
  const isPrivate:boolean = !!privateRoutes[route]

  return (
    <ThemeProvider>
      <ToastContainer
        position='top-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />
      <UserProvider>
        <DataProvider>
          {isPrivate
            ?
            <RouteGuard>
              <Component />
            </RouteGuard>
            :  <Component />
          }
        </DataProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default MyApp

