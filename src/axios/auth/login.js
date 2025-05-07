import { instance } from "../instance";

export async function login(request) {
  try {
    const { data } = await instance.post("/auth/login", request);
    return data;
  } catch (error) {
    throw error;
  }
}

// esto debe estar en el archivo user
export async function profile() {


    try {
        const { data } = await instance.get(`/auth/profile`)
        return data
        
    } catch (error) {
      console.log('Error en la solicitud:', error.response || error.message);
        throw error
    }

}

export async function services() {
  try {
    const { data } = await instance.get(`/services`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function users() {
  try {
    const { data } = await instance.get(`/users`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function findUser(id) {
  try {
    const { data } = await instance.get(`/users/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function create(request) {
  try {
    const { status } = await instance.post(`/users`, request);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function deleteUsers(id) {
  try {
    const { status } = await instance.delete(`/users/${id}`);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function update(request, id) {
  try {
    const { status } = await instance.put(`/services/${id}`, request);
    return status;
  } catch (error) {
    throw error;
  }
}

// *_______*
export async function logout() {
  try {
    const { status } = await instance.post("/auth/logout");
    return status;
  } catch (error) {
    throw error;
  }
}

export async function changePassword(data) {
  try {
    const { status } = await instance.put("/auth/change-password", data);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function registroHoras(data) {
  try {
    const { status } = await instance.post("/services", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return status;
  } catch (error) {
    throw error;
  }
}

export async function getDocument(id) {
  try {
    const { data } = await instance.get(`/services/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}
