import type {AxiosError} from "axios";
export type FetchError<ErrorBody = unknown> = AxiosError<ErrorBody>;

export type ErrorResponse = {
    error: string;
    message: string;
    status: ErrorStatus;
    timestamp: Date;
    other: unknown
}

export type ErrorStatus  = AuthErrorCodes;
export enum AuthErrorCodes{
    TRY_AGAIN = 5101
}