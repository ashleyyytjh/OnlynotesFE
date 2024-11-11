import AxiosInstance from './AxiosInstance'

export const subscribeRequest = async (subjectTag: string) => {
    try {
        console.log('tag is ', subjectTag)  
        const data = await AxiosInstance.post('/requests', { 
            "tag": subjectTag
         }) 
         return data.data
    } catch (error) {
        throw error
    }  
}

export const getAllUserRequest = async () => {
    try {
        const data = await AxiosInstance.get('/requests') 
         return data.data
    } catch (error) {
        throw error
    }
}