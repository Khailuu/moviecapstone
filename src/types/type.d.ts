declare type HttpResponse<T> = {
    [x: string]: SetStateAction<TaiKhoan | null>
    statusCode: number
    message: string
    content: T
}