import axios from 'axios';


const http = axios.create({
    baseURL:"http://localhost:3000/admin/api"
})
// http.interceptors.request.use(config => {

// })
export default{
    http
}