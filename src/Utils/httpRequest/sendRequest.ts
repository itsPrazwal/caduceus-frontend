import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { tokenAssembler } from '../UtilFunctions'

const getRootUrl = ():string => {
  const port = process.env.NEXT_PUBLIC_PORT || 8000
  const dev = process.env.NEXT_PUBLIC_NODE_ENV !== 'production'
  return dev ? `http://localhost:${port}/api` : 'https://stark-fjord-70567.herokuapp.com/api'
}

const sendRequest = async (
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'GET',
  path: string,
  secured = true,
  body?: any,
): Promise<AxiosResponse> => {
  const getApi:AxiosInstance = axios.create({
    baseURL: getRootUrl(),
    headers: secured
      ?
      {
        post: { 'Content-Type': 'application/json' },
        'x-access-token': tokenAssembler() || '',
      }
      :
      {
        post: { 'Content-Type': 'application/json' },
      },
  })

  return getApi.request({
    method: method,
    url: path,
    ...((method === 'POST' || method === 'PUT') && { data: body, }),
    timeout: 5000,
  })
}

export default sendRequest
