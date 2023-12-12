import axios from "axios";

export const getUser = async ({page,limit,search}) => {
    try {
        const params = {
            page,
            limit,
            search
        }
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/users/`, {
            params
        })
        return result.data
    } catch (error) {
        console.log(error.response.data);
    }
}
export const getUserWithRole = async ({page,limit,search}) => {
    try {
        const params = {
            page,
            limit,
            search
        }
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/users/get-users-with-role`, {
            params
        })
        return result.data
    } catch (error) {
        console.log(error.response.data);
    }
}
export const createUser = async ({data}) => {
    try {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, data)
        return result.data
    } catch (error) {
        console.log(error.response.data);
    }
}
export const deleteUser = async (id) => {
    try {
        const result = await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`)
        return result.data
    } catch (error) {
        console.log(error.response.data);
    }
}