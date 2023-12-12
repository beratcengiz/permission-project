import axios from "axios"
export const getRole = async ({page,limit,search}) => {
    console.log('page',page,'limit',limit,'search',search)
    try {
        const params = {
            page,
            limit,
            search
        }
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/role/`, {
            params
        })
        return result.data
    } catch (error) {
        console.log(error);
    }
}