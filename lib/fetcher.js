import { setCookie, getCookie } from 'cookies-next'
import clientAxios from "./axios"

async function refreshToken() {
    try {
        const response = await clientAxios.post('/api/auth/token', { withCredentials: true })
        if (response.data.error) {
            throw new Error(response.data.error.message)
        }
        setCookie('accessToken', response.data.accessToken)
        return response.data.accessToken

    } catch (error) {
        // throw the error
        throw error
    }
}
// automatically refresh the access token
async function handleRequest(req) {
    try {
        const accessToken = getCookie('accessToken')
        return await req(accessToken)
    } catch (error) {
        // to try to refresh once
        let sent = false
        while (!sent) {
            if (error?.response?.status === 401) {
                sent = true
                const accessToken = await refreshToken()
                return await req(accessToken)
            }
            throw error
        }
    }
}

export default async function fetcher(url) {
    try {
        const req = (accessToken) => clientAxios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } })
        const { data } = await handleRequest(req)
        return [null, data]
    } catch (error) {
        return [error, null]
    }
}

export async function poster(url, d, form = false) {
    try {
        const req = (accessToken) => clientAxios.post(url, d, { withCredentials: true, headers: { 'Content-Type': form ? 'multipart/form-data' : 'application/json', Authorization: `Bearer ${accessToken}` } })
        const { data } = await handleRequest(req)
        if (data.error) {
            return [data.error, null]
        }
        return [null, data]
    } catch (error) {
        return [error, null]
    }
}

export async function putter(url, d) {
    try {
        const req = (accessToken) => clientAxios.put(url, d, { withCredentials: true, headers: { Authorization: `Bearer ${accessToken}` } })
        const { data } = await handleRequest(req)
        if (data.error) {
            return [data.error, null]
        }
        return [null, data]
    } catch (error) {
        return [error, null]
    }
} export async function deleter(url) {
    try {
        const req = (accessToken) => clientAxios.delete(url, { withCredentials: true, headers: { Authorization: `Bearer ${accessToken}` } })
        const { data } = await handleRequest(req)
        if (data.error) {
            return [data.error, null]
        }
        return [null, data]
    } catch (error) {
        return [error, null]
    }
}