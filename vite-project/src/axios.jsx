import axios from "axios";

const instanse = axios.create({
    baseURL: 'http://localhost:4000/'
})

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

instanse.interceptors.request.use((config)=>{
config.headers.Authorization = getCookie('access_token');
return config
})
export default instanse