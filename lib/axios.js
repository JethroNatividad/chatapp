import axios from "axios"
// check if production
const isProduction = process.env.NODE_ENV === "production"
// const vercelURL = process.env.NEXT_PUBLIC_VERCEL_URL

// const baseURL = isProduction ? `https://${vercelURL}/api` : "http://localhost:3000/api"


const clientAxios = axios.create()
// fucking vercel dont have https in production
export const serverAxios = axios.create({ baseURL: isProduction ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : process.env.NEXT_PUBLIC_VERCEL_URL })
export default clientAxios