import clientAxios from "./axios"

async function refreshToken() {
    try {
        return await clientAxios.get('/api/auth/token', { withCredentials: true })
    } catch (error) {
        // throw the error
        throw error
    }
}
// automatically refresh the access token
async function handleRequest(req) {
    try {
        return await req()
    } catch (error) {
        // to try to refresh once
        let sent = false
        while (!sent) {
            if (error?.response?.status === 401) {
                sent = true
                await refreshToken()
                return await req()
            }
            throw error
        }
    }
}

export default async function fetcher(url) {
    try {
        const req = () => clientAxios.get(url, { withCredentials: true })
        const { data } = await handleRequest(req)
        return [null, data]
    } catch (error) {
        return [error, null]
    }
}

export async function poster(url, d, form = false) {
    try {
        const req = () => clientAxios.post(url, d, { withCredentials: true, headers: { 'Content-Type': form ? 'multipart/form-data' : 'application/json' } })
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
        const req = () => clientAxios.put(url, d, { withCredentials: true })
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
        const req = () => clientAxios.delete(url, { withCredentials: true })
        const { data } = await handleRequest(req)
        if (data.error) {
            return [data.error, null]
        }
        return [null, data]
    } catch (error) {
        return [error, null]
    }
}