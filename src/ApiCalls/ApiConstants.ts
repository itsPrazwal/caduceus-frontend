//AUTHENTICATION
import { UserType } from '../Utils/enum'

const auth = {
  getUser: '/user',
  register: '/user/register',
  login: '/user/login',
  forgotPassword: '/user/forgot-password',
  resetPassword: '/user/reset-password',
  changePassword: '/user/change-password',
  verifyUser: '/user/verify',
  resendOtp: '/user/resendOtp'
}

const disease = '/disease'
const department = '/department'
const ambulance = '/ambulance'
const ambulanceRequest = '/ambulanceRequest'
const bloodBank = '/bloodBank'
const event = '/event'
const hospital = '/hospital'
const doctor = {
  getByUserId: (userId: string) => `/doctor/user/${userId}`,
  updateById: (id: string) => `/doctor/${id}`,
}
const userByType = (userType: UserType) => `/user/byUserType/${userType}`
const request = {
  create: '/request',
  get: '/request',
  update: '/request',
  requesters: '/request/requesters',
}
// const bloodDonor = {}
// const patient = {}

const user = '/user'

export const apiEndPoints = {
  auth,
  disease,
  department,
  ambulanceRequest,
  ambulance,
  bloodBank,
  event,
  hospital,
  user,
  doctor,
  userByType,
  request,
}
