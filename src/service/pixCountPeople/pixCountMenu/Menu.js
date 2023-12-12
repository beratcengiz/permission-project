import axios from "axios"
export const getMenu = async ({ page, limit,search, type}) => {
    try {
        const params = {
            page,
            limit,
            search,
            type 
        }
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/menu/`, {
            params
        })
        return result.data
    } catch (error) {
        console.log(error.response.data);
    }
}