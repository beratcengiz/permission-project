import axios from "axios"
export const getPermission = async ({ page, limit,search}) => {
    try {
        const params = {
            page,
            limit,
            search,
        }
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/permission/`, {
            params
        })
        return result.data
    } catch (error) {
        console.log(error.response.data);
    }
}