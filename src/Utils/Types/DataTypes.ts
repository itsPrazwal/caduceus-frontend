import { EventCategory } from '../enum'

interface FieldTypeDisease {
    _id: string,
    name: string,
    bodyPart: string[],
    causes: string[],
    symptoms: string[],
    riskFactors: string[],
    prevention: string[],
    complications: string[],
    homeRemedy: string[],
    deleted: boolean
}
interface FieldTypeDepartment {
    _id: string,
    name: string,
    relatedDiseases: string[],
    deleted: boolean
}
interface FieldTypeAmbulance {
    _id: string,
    ambulanceName: string,
    organizationName: string,
    email: string,
    numbers: number,
    address: string,
    deleted: boolean,
}
interface FieldTypeBloodBank {
    _id: string,
    bloodBankName: string,
    email: string,
    numbers: number,
    address: string,
    deleted: boolean,
}
interface FieldTypeEvents {
    _id: string,
    eventName: string,
    eventCategory: EventCategory,
    address: string,
    contact: number,
    deleted: boolean
}
interface FieldTypeHospital {
    _id: string,
    name: string,
    speciality: string[],
    detail: string,
    email: string,
    numbers: number[],
    address: string,
    ambulanceId: string,
    deleted: boolean
}

interface FieldTypeAmbulanceRequest {
    fullName: string,
    location: string,
    contactNumber: string
}

export type {
  FieldTypeDisease,
  FieldTypeDepartment,
  FieldTypeAmbulance,
  FieldTypeBloodBank,
  FieldTypeEvents,
  FieldTypeHospital,
  FieldTypeAmbulanceRequest
}
