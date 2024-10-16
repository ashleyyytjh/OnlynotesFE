import AxiosInstance from './AxiosInstance.ts'

export const codeExchange = async (code: string) => {
    try {
        const response = await AxiosInstance.get(
            '/api/v1/auth/callback?code=' + code
        )
        return response.data
    } catch (error) {
        throw error
    }
}

export const refreshToken = async () => {
    try {
        const response = await AxiosInstance.get('/api/v1/auth/refreshToken')
        return response.data
    } catch (error) {
        throw error
    }
}

export const authTest = async () => {
    try {
        const response = await AxiosInstance.get('/api/v1/auth/test')
        return response.data
    } catch (error) {
        throw error
    }
}

export const logout = async () => {
    try {
        const response = await AxiosInstance.get('/api/v1/auth/logout')
        return response.data
    } catch (error) {
        throw error
    }
}

export const isAuthenticated = async () => {
    try {
        const response = await AxiosInstance.get('/api/v1/auth').then()
        console.log('AUTH: ', response.status == 200)
        return response.status == 200
    } catch (error) {
        throw error
    }
}
