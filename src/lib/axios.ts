import axios, {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_BE_BASE_URL
console.log(baseUrl)

// Create an instance of Axios with custom configuration
const axio: AxiosInstance = axios.create({
    baseURL: baseUrl, // Replace with your API base URL
    timeout: 5000, // Set a timeout value in milliseconds
    headers: {
        'Content-Type': 'application/json', // Set the default content type
    },
    validateStatus: () => {
        return true // I'm always okay with the result (status code)
    },
})

// Define a request interceptor
axio.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        return config
    },
    (error) => {
        // Handle request error
        return Promise.reject(error)
    },
)

// Define a response interceptor
axio.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    (error) => {
        // Handle response error
        return Promise.reject(error)
    },
)

export default axio
