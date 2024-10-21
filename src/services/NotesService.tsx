import AxiosInstance from './AxiosInstance.ts'

const notesUrl = 'http://localhost:8080/api/v1'
const limit = 8

export const getAllVerifiedNotes = async (page: string, limit: string) => {
    try {
        const data = await AxiosInstance.get(`${notesUrl}/notes?page=${page}&limit=${limit}`);
        console.log('test', data);
        return data.data;
    } catch (error) {
        throw error
    }
} 

export const createNotes = async (notes: any) => {
    try {
        const data = await AxiosInstance.post(`${notesUrl}/notes`, notes);
        console.log('data' , data);
        return data;
    } catch (error) {
        throw error
    }
} 

export const getNotesById = async (id: string) => {
    try {
        const data = await AxiosInstance.get(`${notesUrl}/notes/${id}`)
        return data.data
    } catch (error) {
        throw error
    }
}

export const getAllDistinctCategories = async () => {
    try {
        const data = await AxiosInstance.get(`${notesUrl}/notes/categories`)
        return data.data
    } catch (error) {
        throw error
    }
}

export const getNotesFromAccountId = async () => {
    try {
        const data = await AxiosInstance.get(`${notesUrl}/notes/account`)
        return data.data
    } catch (error) {
        throw error
    }
}

export const getAllVerifiedNotesByCategoryCode = async (catCode : string, page : string) => {
    try {
        const data = await AxiosInstance.get(`${notesUrl}/notes?categoriyCode=${catCode}?page=${page}&limit=${limit}`)
        return data.data
    } catch (error) {
        throw error
    }
}

