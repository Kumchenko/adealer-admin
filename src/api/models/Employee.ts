export interface IEmployeeLogin {
    login: string
    password: string
}

export interface IEmployeeAuthorization {
    id: number
    login: string
    accessToken: string
    refreshToken: string
}

export interface IEmployeeTokens {
    accessToken: string
    refreshToken: string
}

export interface IEmployeeData {
    id: number
    login: string
}
