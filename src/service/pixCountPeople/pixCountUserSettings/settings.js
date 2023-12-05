import axios from "axios";

export const getUser = async ({page,limit,search}) => {
    try {
        const params = {
            page,
            limit,
            search
        }
        const result = await axios.get('http://10.2.8.87:3001/users/', {
            params
        })
        return result.data
    } catch (error) {
        console.log(error.response.data);
    }
}