import axios, {AxiosError} from "axios";

export const ERROR_REPORT_EMAIL_TO = 'emailTo@test.com'
export const ERROR_REPORT_EMAIL_CC = 'emalCC@test.ncom'

export function isUnauthorizedError(maybeAxiosError: AxiosError | Error): boolean {
    const isAxiosError = axios.isAxiosError(maybeAxiosError)
    if (isAxiosError && maybeAxiosError.response) {
        // 403 === unauthorized
        return maybeAxiosError.response.status === 403
    }

    return false
}

export function isConflictError(maybeAxiosError: AxiosError | Error): boolean {
    const isAxiosError = axios.isAxiosError(maybeAxiosError)
    if (isAxiosError && maybeAxiosError.response) {
        // 409 === conflict
        return maybeAxiosError.response.status === 409
    }

    return false
}