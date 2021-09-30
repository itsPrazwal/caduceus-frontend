import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo, useState
} from 'react'

import { FieldTypeUserData, FunctionWithParam, Nullable } from 'Utils/Types'
import { apiAuthGetUser } from '../ApiCalls/AuthApi'

export const UserContext = createContext<UserContextInterface>({} as UserContextInterface)

interface UserContextInterface {
  user: UserInterface,
  setUserByData: FunctionWithParam<FieldTypeUserData>,
  isLoggedIn: boolean,
}

interface UserContextProps{
  children: ReactElement
}

interface UserInterface {
  userData: Nullable<FieldTypeUserData>,
  loading: boolean,
  isVerified: boolean,
  waiting: boolean
}

const initialUser = {
  loading: false,
  userData: null,
  isVerified: false,
  waiting: true,
}

export const UserProvider = ({ children }:UserContextProps):ReactElement => {
  const [user, setUser] = useState<UserInterface>(initialUser)

  const checkUser = useCallback(async () => {
    setUser(prevState => ({ ...prevState, loading: true }))
    try{
      const userResponse = await apiAuthGetUser()
      if(userResponse) {
        setUser({ loading: false, waiting: false, userData: userResponse.data, isVerified: userResponse.data.isVerified })
      }
    }catch (err){
      console.error(err)
      setUser({ loading: false, waiting: false, userData: null, isVerified: false })
    }
  }, [])

  useEffect(() => {
    checkUser()
  }, [checkUser])

  const setUserByData:FunctionWithParam<FieldTypeUserData> = data => {
    setUser({ loading: false, waiting: false, userData: data, isVerified: data.isVerified })
  }

  const isLoggedIn:boolean = useMemo(() => !!user.userData, [user])

  return(
    <UserContext.Provider value={{ user, setUserByData, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
