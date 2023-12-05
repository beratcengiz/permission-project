import axios from "axios"
export const signIn = async ({userName,password}) => {
    const data = {
        userName,
        password
    }
    console.log('data',data)
    try {
        const result = await axios.post('http://10.2.8.87:3001/auth/signin', data)
        return result.data
    } catch (error) {
        return error.response
    }

}