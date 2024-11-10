import AxiosInstance from './AxiosInstance.ts'
const limit = 8

export const getAllVerifiedNotes = async (page: string, limit: string) => {
    try {
        const data = await AxiosInstance.get(`/notes?page=${page}&limit=${limit}`);
        console.log('test', data);
        return data.data;
    } catch (error) {
        throw error
    }
} 

export const createNotes = async (notes: FormData) => {
    try {
        const data = await AxiosInstance.post(`/notes`, notes,
            {
                headers: {'Content-Type': 'multipart/form-data'}
              }
        );
        console.log('data' , data);
        return data;
    } catch (error) {
        throw error
    }
} 

export const getNotesById = async (id: string) => {
    try {
        const data = await AxiosInstance.get(`/notes/${id}`)
        return data.data
    } catch (error) {
        throw error
    }
}

export const getAllDistinctCategories = async () => {
    try {
        const data = await AxiosInstance.get(`/notes/categories`)
        return data.data
    } catch (error) {
        throw error
    }
}

export const getNotesFromAccountId = async () => {
    try {
        const data = await AxiosInstance.get(`/notes/account`)
        return data.data
    } catch (error) {
        throw error
    }
}

export const getAllVerifiedNotesByCategoryCode = async (catCode : string, page : string) => {
    try {
        const data = await AxiosInstance.get(`/notes?categoriyCode=${catCode}?page=${page}&limit=${limit}`)
        return data.data
    } catch (error) {
        throw error
    }
}

