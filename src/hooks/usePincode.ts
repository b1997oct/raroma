import axios from "axios"
import { useState } from "react"

const base_url = "https://api.postalpincode.in/pincode/110001"

const usePincode = async () => {

    const [data, setData] = useState([])

    const address_by_pincode = async (pincode: string | number) => {
        if (pincode.toString().length != 6) {
            return
        }
        try {
            const { data: results } = await axios.get(base_url + pincode)
            setData(results[0].PostOffice)
        } catch (error) {
            console.log("cont get address" + error.message);
        }
    }

    return { data, address_by_pincode }
}

export default usePincode