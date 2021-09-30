import { Nullable } from './main'
import { BloodGroup } from '../enum'

interface FieldTypeBasicInfo {
    fullName: string
    bio: string
    gender: string
    phoneNumber: string
    bloodGroup: Nullable<BloodGroup>
    dob: string
    address: {
        detail: string,
        isPublic: boolean
    },
    activeForDonation: boolean
}

interface FieldTypeEducation {
    _id?: string
    educationInstitution: string,
    degree: string,
    address: string,
    startYear: string,
    endYear: string,
    currentlyEnrolled: boolean,
    speciality: string
}

interface FieldTypeWorkExperience {
    _id?: string
    medicalInstitution: string,
    address: string
    startYear: string,
    endYear: string,
    currentCompany: boolean
}

interface FieldTypeDoctorInfo {
    _id: string
    userId: string,
    education: FieldTypeEducation[],
    relatedDepartment: string[],
    experience: FieldTypeWorkExperience[],
    linkedHospital: string[]
}

export type {
  FieldTypeBasicInfo,
  FieldTypeEducation,
  FieldTypeDoctorInfo,
  FieldTypeWorkExperience,
}
