import AxiosInstance from './AxiosInstance.ts'

export const getSession = async () => {
    try {
        const response = await AxiosInstance.get('/users')
        console.log('SESSION: ' + response.data)
        return response.data
    } catch (error) {
        throw error
    }
}
