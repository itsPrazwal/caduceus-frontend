import { BloodGroup, UserType } from '../enum'

interface FieldTypeLogin {
    emailId: string,
    password: string,
}

interface FieldTypeResendOtpCode {
    emailId: string,
}

interface FieldTypeRegister {
    emailId: string,
    fullName: string,
    password: string,
    userType: UserType
}

interface FieldTypeForgotPassword {
    emailId: string,
}

interface FieldTypeResetPassword {
    emailId: string,
    otpCode: string,
    password: string,
}

interface FieldTypeChangePassword {
    prevPassword: string,
    newPassword: string,
}

interface FieldTypeVerifyUser {
    emailId: string,
    otpCode: string
}

interface FieldTypeUserDataPublic{
    _id: string,
    emailId: string,
    fullName: string,
    dob?: string,
    bloodGroup?: BloodGroup,
    gender?: string,
    phoneNumber?: number,
    address?: {
        isPublic: boolean,
        detail: string,
    },
    bio?:string,
    imageUrl?: string,
    activeForDonation?: boolean
}

interface FieldTypeUserData extends FieldTypeUserDataPublic{
    isVerified: boolean,
    userType: UserType
}

export type {
  FieldTypeLogin,
  FieldTypeChangePassword,
  FieldTypeForgotPassword,
  FieldTypeResetPassword,
  FieldTypeVerifyUser,
  FieldTypeResendOtpCode,
  FieldTypeUserData,
  FieldTypeRegister,
  FieldTypeUserDataPublic
}
