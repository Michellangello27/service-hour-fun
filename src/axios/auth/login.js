import { instance } from "../instance";

export async function login(request) {
    try {
        const { data } = await instance.post('/auth/login', request)
        console.log(data)
        return data
    } catch (error) {
        throw error
    }
}

// esto debe estar en el archivo user
export async function profile() {
    try {
        const { data } = await instance.get(`/auth/profile`)
        console.log(data)
        return data
    } catch (error) {
        throw error
    }
}

export async function users() {
    try {
        const { data } = await instance.get('/users')
        return data
    } catch (error) {
        throw error
    }
}

export async function deleteUsers(id) {
    try {
        const { status } = await instance.delete(`/users/${id}`)
        return status
    } catch (error) {
        throw error
    }
}

export async function update(request, id) {
    try {
        const { status } = await instance.put(`/users/${id}`, request)
        return status
    } catch (error) {
        throw error
    }
}

// *_______*
export async function logout() {
    try {
        const { status } = await instance.post('/auth/logout')
        return status
    } catch (error) {
        throw error
    }
}

export async function changePassword(data) {
    try {
        const { status } = await instance.put('/auth/change-password', data)
        return status
    } catch (error) {
        throw error
    }
}