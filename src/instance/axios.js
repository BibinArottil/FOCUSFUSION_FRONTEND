import axios from 'axios'
import { BaseUrl } from './constrain'

const instance = axios.create({
    baseURL:BaseUrl
})

export default instance

