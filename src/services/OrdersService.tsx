import AxiosInstance from './AxiosInstance.ts'

export const createOrder = async (order: any) => {
    try {
        const data = await AxiosInstance.post('/orders', order)
        return data.data
    } catch (error) {
        throw error
    }
}
