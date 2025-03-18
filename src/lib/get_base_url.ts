const get_base_url = (subdomain: string = "") => {
    return `http://${subdomain ? subdomain + "." : ""}localhost:3000`;
  };
  
  export default get_base_url;
  