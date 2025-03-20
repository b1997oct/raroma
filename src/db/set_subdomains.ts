import path from "path";
import Profile from "./Tables/Profile";
import fs from "fs";


const set_subdomains = async () => {
    try {
        let data = await Profile.find()
        const values = {}
        data.map(d => {
            if (d.subdomain) {
                values[d.subdomain] = d._id.toString()
            }
        })
        const jsonData = JSON.stringify(values, null, 2);
        fs.writeFileSync("profiles.json", jsonData, "utf-8");
        console.log("subdoamin updated");
    } catch (error) {
        console.log('set_subdomains: ', error.message);
    }
}

export default set_subdomains