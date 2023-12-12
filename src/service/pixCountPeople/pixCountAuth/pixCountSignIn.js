import axios from "axios"
export const signIn = async ({userName,password}) => {
    const data = {
        userName,
        password
    }
    console.log('data',data)
    try {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/device/get-user-device/auth/signin`, data)
        return result.data
    } catch (error) {
        return error.response
    }

}