import AxiosInstance from './AxiosInstance.ts'

export const createOrder = async (order: any) => {
    try {
        const data = await AxiosInstance.post('/orders', order)
        return data.data
    } catch (error) {
        throw error
    }
}

export const getOrders = async (id: any) => {
    try {
        const data = await AxiosInstance.get(`/orders/user/${id}`)
        return data.data
    } catch (error) {
        throw error
    }
}

export const orderWebhook = (id: any, onMessage: (data: any) => void) => {
    console.log(id);
    const socket = new WebSocket(`ws://localhost:3000/orders/${id}`);

    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);  // Call the provided callback with the received data
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return socket; // Return the socket if you need to control it outside
};