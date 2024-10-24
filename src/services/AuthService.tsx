import AxiosInstance from './AxiosInstance.ts'

export const codeExchange = async (code: string) => {
    try {
        const response = await AxiosInstance.get(
            '/auth/callback?code=' + code
        )
        return response.data
    } catch (error) {
        throw error
    }
}

export const refreshToken = async () => {
    try {
        const response = await AxiosInstance.get('/auth/refreshToken')
        return response.data
    } catch (error) {
        throw error
    }
}

export const authTest = async () => {
    try {
        const response = await AxiosInstance.get('auth/test')
        return response.data
    } catch (error) {
        throw error
    }
}

export const logout = async () => {
    try {
        const response = await AxiosInstance.get('auth/logout')
        return response.data
    } catch (error) {
        throw error
    }
}

export const isAuthenticated = async () => {
    try {
        const response = await AxiosInstance.get('auth')
        // console.log('AUTH: ', response.status == 200)
        return response.status == 200
    } catch (error) {
        throw error
    }
}
