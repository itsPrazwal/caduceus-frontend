import { RequestStatus } from '../enum'

interface FieldTypeRequestCreate {
    donorId: string,
    patientId: string,
}

interface FieldTypeRequestMain extends FieldTypeRequestCreate {
    _id: string,
    status: RequestStatus,
    message: string
}

export type { FieldTypeRequestCreate, FieldTypeRequestMain }
