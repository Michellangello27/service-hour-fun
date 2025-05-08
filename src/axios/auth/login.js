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
    const { data } = await instance.get(`/auth/profile`);
    return data;
  } catch (error) {
    console.log("Error en la solicitud:", error.response || error.message);
    throw error;
  }
}

// para actualizar el perfil
export async function updateprofile(data) {
  try {
    const response = await instance.put(`/auth/profile`, data);
    return response.data;
  } catch (error) {
    console.log("Error en la solicitud:", error.response || error.message);
    throw error;
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
    const { status } = await instance.put(`/users/${id}`, request);
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

export async function registroHoras(request) {
  try {
    const { status } = await instance.post(`/services`, request, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return status;
  } catch (error) {
    throw error;
  }
}

export async function editarActividad(data, id) {
  try {
    const { status } = await instance.patch(`/services/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return status;
  } catch (error) {
    throw error;
  }
}

export async function load(id) {
  try {
    const { data } = await instance.get(`/evidence/${id}`, {
      headers: {
        "Content-Type": "application/pdf",
        Accept: "application/pdf",
      },
      responseType: "blob",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
