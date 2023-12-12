import axios from "axios"
export const getMenus = async ({type}) => {
    console.log(type)
    try {
        const params = {
            type 
        }
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/menu`, {
            params
        })
        return result.data
    } catch (error) {
        console.log(error.response.data);
    }

}