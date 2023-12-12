import axios from "axios";
export const getDeviceAndUserPairing = async () => {
    try {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/device/get-user-device`)
        return result.data
    } catch (error) {
        console.log(error.response);
    }
}