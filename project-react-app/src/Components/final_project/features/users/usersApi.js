import axios from "axios";

const baseUrl = "http://localhost:4000/user"

export const getAllUserApi = async () => {
    const response = await axios.get(baseUrl)
    return response.data;
}

export const getByIdUserApi = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

export const postUserApi = async (newUser) => {
    const response = await axios.post(baseUrl, newUser)
    return response.data
}

export const loginUserApi = async (existsUser) => {
    
    const response = await axios.post(`${baseUrl}/login`, existsUser)
        // .then((response) => {
        //     return response.data;
        // })
        // .catch((error) => {
        //     return error.response
        // });
    return response.data
}