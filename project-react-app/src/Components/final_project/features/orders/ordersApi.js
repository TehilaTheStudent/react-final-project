import axios from "axios";

const baseUrl = "http://localhost:4000/order"

export const getOrdersApi = async () => {
    const response = await axios.get(baseUrl)
    return response.data;
}

export const getByIdOrderApi = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export const postOrderApi = async (newOrder) => {
    const response = await axios.post(baseUrl,newOrder)
    return response.data
}

export const deleteOrderApi= async (id)=>{
    const response = await axios.delete(baseUrl+'/'+id)
    return response.data
}