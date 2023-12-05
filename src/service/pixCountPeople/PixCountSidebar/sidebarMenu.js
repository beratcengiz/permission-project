import axios from "axios"
export const getMenus = async ({type}) => {
    console.log(type)
    try {
        const params = {
            type 
        }
        const result = await axios.get('http://10.2.8.87:3001/menu', {
            params
        })
        return result.data
    } catch (error) {
        console.log(error.response.data);
    }

}