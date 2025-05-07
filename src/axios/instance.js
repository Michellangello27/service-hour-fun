import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://www.hs-service.api.crealape.com/api/v1/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
}); 
//validar los status code 403 
const success = (response) => response;
const error = (error) => {
    console.log(error.response.data.message)
    if(error.status === 401 && error.response.data.message !=="Invalid credentials"){
        window.location.href = '/login'
    }

    if(error.status === 403){
        window.location.href = '/forbiden'
    }
    return Promise.reject(error);
}
instance.interceptors.response.use(success, error);

