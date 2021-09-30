/** A high-level generic object. */
import { EventType } from '../enum'

type GenericObject<T = unknown> = { [key: string]: T }

/** A high-level error object. */
interface ErrorObject {
    error: string,
}

/** Generic type to allow null. */
type Nullable<T> = T | null

/** Function with single parameter returning void*/
type FunctionWithParam<T> = (p: T) => void

/** Function with no parameter returning void*/
type FunctionWithNoParam = () => void

/** Function with parameter with returning type*/
type FunctionWithNoParamButReturn<R> = () => R

/** Function with parameter with returning type*/
type FunctionWithParamAndReturn<P, R> = (p: P) => R

interface ApiResponseType<T> {
    data: T,
    message: string,
    result: boolean
}

interface ApiErrorObject {
    message: string,
    result: boolean,
    status: number,
}

interface QuestionSetType {
    userType: string,
    questionField: string,
    question: string,
    isRequired: boolean,
    questionType: string,
    options: AnswerSetType[],
    hasOthers: boolean
}

interface AnswerSetType {
    displayOption: string,
    value: string,
}

interface FieldTypeBanner {
    title: string,
    description: string,
    imageUrl: string,
    navButtons?: {
        name: string,
        redirection: string
    }[]
}

interface FieldTypeEvent {
    title: string,
    eventType: EventType,
    date: string,
    rating: number,
    enrolledUsers: number,
    imageUrl: string,
    host: string
}

interface FieldTypeHost {
    name: string,
    position: string,
    company: string,
    description: string,
    imageUrl: string,
}

interface FieldTypeReview {
    name: string,
    position: string,
    description: string,
    rating: number,
    imageUrl: string
}

export type {
  GenericObject,
  ErrorObject,
  FunctionWithParam,
  FunctionWithNoParam,
  FunctionWithParamAndReturn,
  FunctionWithNoParamButReturn,
  Nullable,
  QuestionSetType,
  AnswerSetType,
  FieldTypeBanner,
  FieldTypeEvent,
  FieldTypeHost,
  FieldTypeReview,
  ApiResponseType,
  ApiErrorObject,
}
