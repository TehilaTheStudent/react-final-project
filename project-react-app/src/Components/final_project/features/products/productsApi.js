import axios from "axios";

const baseUrl = "http://localhost:4000/product"

export const getProductsApi = async () => {
    const response = await axios.get(baseUrl)
    return response.data;
}

export const getByIdProductApi = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export const postProductApi = async (newProduct) => {
    const response = await axios.post(baseUrl,newProduct)
    return response.data
}

export const putProductApi = async (id,updatedProduct) => {
    const response = await axios.put(`${baseUrl}/${id}`,updatedProduct)
    return response.data
}