import axios from "axios";
export const getDeviceAndUserPairing = async () => {
    try {
        const result = await axios.get('http://10.2.8.87:3002/device/get-user-device')
        return result.data
    } catch (error) {
        console.log(error.response);
    }
}