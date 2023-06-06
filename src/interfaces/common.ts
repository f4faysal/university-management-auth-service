import { IGenericErrorMessage } from './error'

export type IGenericErrorResponce = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}
